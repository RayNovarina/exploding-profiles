
$(function() {
  // Bind events and initialize plugin
  statusLog( "  ..*2-domReady*" );
  $('.profile-01-gina')
    .on('pixellate-exploded', function() {
      var self = this;
      setTimeout(function() {
        // $(self).pixellate('in');
      }, 500);
    })
    .on('pixellate-imploded', function() {
      var self = this;
      setTimeout(function() {
       // $(self).pixellate('out');
      }, 2000);
    })
    .pixellate();
  statusLog( "  ..*3-after domReadyPixellate()*" );
  $( ".init-status" ).addClass('init-done');
});

//------------------------------------------------------------------------------
var pluginName = 'pixellate',
    defaults = {
      // Grid divisions
      columns: 20,
      rows: 20,

      // Duration of explosion animation
      duration: 1500,

      // Direction of explosion animation ('out', 'in', or 'none')
      direction: 'out',

      // Resize pixels during animation
      scale: true,

      // Coordinates representing the source of the explosion force
      //(e.g. [-1, 1] makes the explodey bits go up and to the right)
      explosionOrigin: [0,0]
    };
statusLog( "  ..*4-global data done*" );

//------------------------------------------------------------------------------
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
  };
statusLog( "  ..*5: Add window.request/cancelAnimationFrame()*" );

//------------------------------------------------------------------------------
// Create an instance of the plugin and attach it to ?? '$.data'??
// which is the '.explode' div/image?
$.fn[ pluginName ] = function ( options ) {
  return this.each(function() {
    if ( !$.data( this, "plugin_" + pluginName ) ) {
      statusLog( "  ..*6: $.fn[ " + pluginName + " ] Create an instance of " + "plugin_" + pluginName + " and attach it to??*" );
      $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
    } else if(typeof options === 'string') {
      statusLog( "  ..*7: $.fn[ " + pluginName + " ] Set options.direction of " + "plugin_" + pluginName + " to " + options + "*" );
      $.data( this, "plugin_" + pluginName ).options.direction = options;
      $.data( this, "plugin_" + pluginName ).init();
    }
  });
};
