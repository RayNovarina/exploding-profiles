/*
  This plugin reg a global
*/


/*
1) hide current page contents:
2) build page's default view:
3) On dom ready:
4) On click event:
5) On scroll event:

1) Transform photo into effects container.
     - convert from img.png to img-halftone.png
2) Attach scroll event to photo.
     - trigger when photo is in/out of view.
3) Build effects container per location data.
     - explode/implode transformed photo.
*/

exp_statusLog( "  ..*1-uponLoad*" );

jQuery(function() {
  exp_statusLog( "  ..*2-domReady*" );
  exp_target_page_fixups();
  exp_init();
  exp_convert_data_to_html();
  exp_build_default_view();
  exp_statusLog( "  ..*3-Init done*" );
  exp_statusLog('init-done');
});
