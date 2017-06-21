function exp_statusLog( msg, plugIn) {
  if ( $( ".init-done" ).length == 0) {
    $( ".init-status" ).append( msg );
  } else {
    if (msg.indexOf("*11-requestAnimationFrame") != -1) {
      var img_src = $('.explode').find('img:first-child').attr('src');
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


  function Plugin(el, options) {
    img_src = $(el).find('img').attr('src');
    name = img_src.slice( img_src.indexOf('/images') + ('/images'.length + 1), img_src.indexOf('_') );
    exp_statusLog( "  ..*5-creating Plugin: for " +
                   name +
                   ". On div class: " + $(el).attr('class') + "*"); // direction = '" + exp_defaults.direction + "'*");
    this.$el = $(el);
    this.options = $.extend({}, exp_defaults, options);
    this._defaults = exp_defaults;
    this._name = exp_pluginName;

    this.init();
    exp_statusLog( "  ..*6-Plugin init done.*" );
  };

  Plugin.prototype = {
    init: function() {
      // Note: this.$el = '<div class=".explode"'>
      // img_src = $(el).find('img').attr('src');
      name = img_src.slice( img_src.indexOf('/images') + ('/images'.length + 1), img_src.indexOf('_') );
      exp_statusLog( "  ..*7-Plugin init for " + name + "*"); // " for this.$el.attr('class'): " + this.$el.attr('class') + "*");
      // this.$el = PlugIn instance's '.explode' container div.
      // this.$el.pixellate-pixel is an array of spans for each image fragment.
      if(!this.$el.find('.pixellate-pixel').length) {
        var $img = this.$el.find('img:first-child'),
            img = new Image();

        this.$el
          .data('pixellate-image-src', $img.attr('src'))
          .data('pixellate-image-el', $img)
          .addClass('pixellate-lock');
        // $img.css('visibility', 'hidden');

        $(img).one('load', $.proxy(this.createPixels, this));

        img.src = this.$el.data('pixellate-image-src');
        if(img.complete) {
          $(img).trigger('load');
        }
      } else {
        this.stylePixels();
      }
    },

    createPixels: function() {
      this.$el.append(new Array((this.options.rows * this.options.columns) + 1).join('<span class="pixellate-pixel"></span>'));
      exp_statusLog( "  ..*9-createPixels: pixellate-pixel[ ].length = '" + this.$el.find('.pixellate-pixel').length + "'*");

      this.stylePixels(true);
      },

    stylePixels: function(initializeStyles) {
      exp_statusLog( "  ..*10-stylePixels(" + this.options.direction +")" + (initializeStyles ? " initializeStyles:" + initializeStyles : "") + "*" );
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

      // Use rAF to ensure styles are set before class is modified
      // requestAnimationFrame(function() {
      //   exp_statusLog( "  ..*11-requestAnimationFrame: direction = '" + self.options.direction + "'*", self);
      //   if(self.options.direction == 'out') {
      //     self.$el.removeClass('pixellate-lock');
      //   } else if(self.options.direction == 'in') {
          // self.$el.one('pixellate-imploded', function() {
          //   self.$el.addClass('pixellate-lock');
          // });
      //     self.$el.addClass('pixellate-lock');
      //   }
      // });

      // Fire plugin events after animation completes
      // TODO: Use transition events when supported
      // setTimeout(function() {
      //   if(self.options.direction == 'out')
      //     self.$el.trigger('pixellate-exploded');
      //   else if(self.options.direction == 'in')
      //     self.$el.trigger('pixellate-imploded');
      // }, this.options.duration);
    }
  };
