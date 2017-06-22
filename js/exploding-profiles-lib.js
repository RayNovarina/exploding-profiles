
// Extend the jquery lib/Create a global method in the jquery space via the
// $.fn array of registered funcs.
//
// The 'pixellate()' plugin operates on a div 'bio-container' class.
// Create and attach the plugin instance to that div, and run the
// pixellate.init() method against it.
// First call stack: exploding-profiles.js(L16).anonymousfunc() --> exp_build_default_view(this)
//                   exp_build_default_view(L111): var $img_div = $active_bio.find('.image'); // $('.bio-container');
//                   exp_build_default_view(L116) --> $img_div.pixellate('in');
//                                                sooo.... this is set to the elem that is calling pixellete()
$.fn[ globals.pluginName ] = function ( options ) {
  return this.each(function() {
    // Note: 'this' is the object (HTML '<div class="bio-container"'>) that this method is an attrib of.
    if ( !$.data( this, globals.pluginInstanceName ) ) {
      // This 'profile-container' div does not have a 'plugin_pixellate' method in its jquery data hash.
      exp_statusLog( "  ..*5b: $.fn[ " + globals.pluginName + " ](" + options + ")*" );
      $.data( this, globals.pluginInstanceName, new Plugin( this, options ) );
      // Now this div's $.data has a plugin_pixellate() Plugin instance
      // referenced via '$.data( this, "plugin_" + exp_pluginName ).init();''
    } else if(typeof options === 'string') {
      exp_statusLog( "  ..*5c: $.fn[ " + globals.pluginName + " ](" + options + ")*" );
      $.data( this, globals.pluginInstanceName ).options.direction = options;
      $.data( this, globals.pluginInstanceName ).init();
    }
  });
};

function Plugin(el, options) {
  // Note: $(el) = '<div class="profile-container"'>
  exp_statusLog( "  ..*5-creating Plugin: for " + $(el).attr('id') + ". On: " + $(el).attr('class') + "*");
  this.$el = $(el);
  this.options = $.extend({}, globals.defaults, options);
  this._defaults = globals.defaults;
  this._name = globals.pluginName;

  this.init();
  exp_statusLog( "  ..*6-Plugin init done.*" );
};

Plugin.prototype = {
  init: function() {
    // Note: this.$el = '<div class="profile-container"'>
    exp_statusLog( "  ..*7-Plugin init for " + this.$el.attr('id') + "*");
    // this.$el.pixellate-pixel is an array of spans for each image fragment.
    if(!this.$el.find('.pixellate-pixel').length) {
      //this.$el.data('pixellate-image-src',
      //               this.$el.find(globals.pixellate_pixels_container_class_ref).attr('bio-img-src'));
      //this.$el.addClass('pixellate-lock');
      //exp_statusLog( "  ..*7a: copy of halftone-profile file " + this.$el.data('pixellate-image-src') +
      //               " loaded into div." + globals.pixellate_pixels_container_class_ref + ".*");
      //this.createPixels();

      var $img = this.$el.find(globals.pixellate_photo_class_ref).find('img'),
          img = new Image();

      this.$el
        .data('pixellate-image-src', $img.attr('src'))
        .addClass('pixellate-lock');

      $(img).one('file_load_completed', $.proxy(this.createPixels, this));

      img.src = this.$el.data('pixellate-image-src');
      if(img.complete) {
        exp_statusLog( "  ..*7a: copy of halftone-profile file " + this.$el.data('pixellate-image-src') +
                       " loaded into div." + globals.pixellate_pixels_container_class_ref + ".*");
        $(img).trigger('file_load_completed');
      }
    } else {
      this.stylePixels();
    }
  },

  createPixels: function() {
    this.$el.find(globals.pixellate_pixels_container_class_ref).append(new Array((this.options.rows * this.options.columns) + 1).join('<span class="pixellate-pixel"></span>'));
    exp_statusLog( "  ..*9-createPixels: pixellate-pixel[ ].length = '" + this.$el.find('.pixellate-pixel').length + "'*");
    this.stylePixels(true);
    },

  stylePixels: function(initializeStyles) {
    exp_statusLog( "  ..*10-stylePixels( " + (initializeStyles ? "onlyInitStyles" : this.options.direction) + " )*" );
    var self = this,
        w = this.$el.width(),
        h = this.$el.height(),
        columns = this.options.columns,
        rows = this.options.rows,
        $pixels = this.$el.find('.pixellate-pixel');

    // $('.explode').find('.pixellate-pixel')[0] (length of array = 400)
    // <span class="pixellate-pixel"
    //    style="
    //       position: absolute;
    //       width: 20px; height: 20px;
    //       background-image: url(&quot;./5580042-profile-pictures_halftone-image-generator.png&quot;);
    //       background-size: 400px auto;
    //       backface-visibility: hidden;
    //       left: 0px; top: 0px;
    //       background-position: 0px 0px;
    //       transform: none;
    //       opacity: 1;
    //       transition: all 1500ms ease-in-out 0s;">

    var styles = initializeStyles ? {
      'position': 'absolute',
      'width': (w / columns),
      'height': (h / rows),
      'background-image': 'url('+this.$el.data('pixellate-image-src')+')',
      'background-size': w,
      'backface-visibility': 'hidden'
    } : {};

    for(var idx = 0; idx < $pixels.length; idx++) {
      var pixelStyles = {};

      if(initializeStyles) {
        var x = (idx % columns) * styles.width,
            y = (Math.floor(idx / rows)) * styles.height;

        $.extend(pixelStyles, styles, {
          'left': x,
          'top': y,
          'background-position': (-x)+'px '+(-y)+'px'
        });
      } else {
        if(self.options.direction == 'out') {
          var randX = (Math.random() * 300) - 150 - (self.options.explosionOrigin[0] * 150),
              randY = (Math.random() * 300) - 150 - (self.options.explosionOrigin[1] * 150);

          var transformString = 'translate('+randX+'px, '+randY+'px)';
          if(self.options.scale) {
            transformString += ' scale('+(Math.random() * 1.5 + 0.5)+')';
          }

          $.extend(pixelStyles, {
            'transform': transformString,
            'opacity': 0,
            'transition': self.options.duration+'ms ease-out'
          });
        } else if(self.options.direction == 'in') {
          $.extend(pixelStyles, {
            'transform': 'none',
            'opacity': 1,
            'transition': self.options.duration+'ms ease-in-out'
          });
        }
      }
      $pixels.eq(idx).css(pixelStyles);
    }
  }
};
