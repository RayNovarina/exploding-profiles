/*
1) hide current page contents:
2) build page's default view:
3) On dom ready:
4) On click event:
5) On scroll event:

*/

exp_statusLog( "  ..*1-uponLoad*" );

$(function() {
  exp_statusLog( "  ..*2-domReady*" );
  exp_init(this);
  exp_convert_data_to_html(this);
  exp_build_default_view(this);
  exp_statusLog( "  ..*3-Init done*" );
});

// The 'pixellate()' plugin operates on a bio div 'explode' class.
// Create and attach the plugin instance to that div, and run the
// pixellate.init() method against it.
$.fn[ exp_pluginName ] = function ( options ) {
  return this.each(function() {
    // Note: this = '<div class=".explode"'>
    if ( !$.data( this, "plugin_" + exp_pluginName ) ) {
      exp_statusLog( "  ..*5b: $.fn[ " + exp_pluginName + " ]*" );
      $.data( this, "plugin_" + exp_pluginName, new Plugin( this, options ) );
    } else if(typeof options === 'string') {
      exp_statusLog( "  ..*5c: $.fn[ " + exp_pluginName + " ] direction: " + options + "*" );
      $.data( this, "plugin_" + exp_pluginName ).options.direction = options;
      $.data( this, "plugin_" + exp_pluginName ).init();
    }
  });
};
