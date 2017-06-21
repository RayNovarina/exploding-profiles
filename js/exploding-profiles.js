/*
1) hide current page contents:
2) build page's default view:
3) On dom ready:
4) On click event:
5) On scroll event:

  <script src="../js/exploding-profiles-init.js"></script>
  <script src="../js/exploding-profiles-lib.js"></script>
  <script src="../js/exploding-profiles-click-event.js"></script>
  <script src="../js/exploding-profiles-scroll-event.js"></script>
  <script src="../js/exploding-profiles.js"></script>

 */

 exp_statusLog( "  ..*1-uponLoad*" );

 $(function() {
   exp_statusLog( "  ..*2-domReady*" );
   exp_init(this);
 });

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
