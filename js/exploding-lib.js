
//------------------------------------------------------------------------------
function statusLog( msg, plugIn) {
  if ( $( ".init-done" ).length == 0) {
    $( ".init-status" ).append( msg );
  } else {
    if (msg.indexOf("*11-requestAnimationFrame") != -1) {
      var img_src = $('.profile-01-gina').find('img:first-child').attr('src');
      var name = img_src.slice( img_src.indexOf('/') + 1, img_src.indexOf('_') );
      var cycles = parseInt($( ".cycle-status" ).attr('cycles'));
      if(plugIn.options.direction == 'out') {
        if ( cycles == 2) {
          $( ".cycle-status" ).html( "");
          cycles = 0;
        }
      } else {
        cycles += 1;
      }
      $( ".cycle-status" ).append( "<br />" + "**" + name + "**...");
      $( ".cycle-status" ).attr('cycles', cycles + '');
    }
    $( ".cycle-status" ).append( msg );
  }
};

//------------------------------------------------------------------------------
// Plugin constructor, i.e. create instance via 'new Plugin'
function Plugin(el, options) {
  statusLog( "  ..*5-created Plugin: direction = '" + defaults.direction + "'*");
  this.$el = $(el);
  this.options = $.extend({}, defaults, options);
  this._defaults = defaults;
  this._name = pluginName;

  this.init();
  statusLog( "  ..*6-Plugin init done.*" );
};

//------------------------------------------------------------------------------
// Plugin methods:
//   init:
//   createPixels:
//   stylePixels: 
Plugin.prototype = {
  init: function() {
    statusLog( "  ..*7-Plugin init: *");
    // this.$el = PlugIn instance's '.explode' container div.
    // this.$el.pixellate-pixel is an array of spans for each image fragment.
    if(!this.$el.find('.pixellate-pixel').length) {
      var $img = this.$el.find('img:first-child'),
          img = new Image();

      this.$el
        .data('pixellate-image', $img.attr('src'))
        .addClass('pixellate-lock');
      $img.css('visibility', 'hidden');

      $(img).one('load', $.proxy(this.createPixels, this));

      img.src = this.$el.data('pixellate-image');
      if(img.complete) $(img).trigger('load');
    } else {
      this.stylePixels();
    }
  },

  createPixels: function() {
    this.$el.append(new Array((this.options.rows * this.options.columns) + 1).join('<span class="pixellate-pixel"></span>'));
    statusLog( "  ..*9-createPixels: pixellate-pixel[ ].length = '" + this.$el.find('.pixellate-pixel').length + "'*");

    this.stylePixels(true);
    },

  stylePixels: function(initializeStyles) {
    statusLog( "  ..*10-stylePixels(entry)*" );
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
      'background-image': 'url('+this.$el.data('pixellate-image')+')',
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
      }

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

      $pixels.eq(idx).css(pixelStyles);
    }

    // Use rAF to ensure styles are set before class is modified
    requestAnimationFrame(function() {
      statusLog( "  ..*11-requestAnimationFrame: direction = '" + self.options.direction + "'*", self);
      if(self.options.direction == 'out') {
        self.$el.removeClass('pixellate-lock');
      } else if(self.options.direction == 'in') {
        self.$el.one('pixellate-imploded', function() {
          self.$el.addClass('pixellate-lock');
        });
      }
    });

    // Fire plugin events after animation completes
    // TODO: Use transition events when supported
    setTimeout(function() {
      if(self.options.direction == 'out')
        self.$el.trigger('pixellate-exploded');
      else if(self.options.direction == 'in')
        self.$el.trigger('pixellate-imploded');
    }, this.options.duration);
  }
};
