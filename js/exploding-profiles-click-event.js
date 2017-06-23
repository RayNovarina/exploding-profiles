
function exp_add_click_handler( $active_bio, profile_idx, profile_div) {
  // alert( index + ": " + $(el).attr('id') );
  $(profile_div).click(function(attribs) {
    var self = $(attribs.currentTarget);
    //alert( 'Clicked on \'' + self.attr('id') + '\'' +
    //       '.  Active halftone profile: ' + globals.active_bio.attr('active_idx') + ':' + globals.active_bio.attr('active_id')
    //);
    var $source_bio = $( $('.bio-container').toArray() [ parseInt(self.attr('bio-idx')) ] );

    $( ".cycle-status" ).html( "<br />" + "**" + self.attr('id') + "**..." );
    exp_statusLog( "  ..*16  Clicked on '" + self.attr('id') +
                   "'.  Active halftone profile: " + globals.active_bio.attr('active_idx') + ":" +
                   globals.active_bio.attr('active_id') + "*" );

    // NOTE: move divs back to profile first before we append new?

    globals.active_bio.attr('active_id', self.attr('id'));
    globals.active_bio.attr('active_idx', self.attr('profile-idx'));
    globals.active_bio.find('.name').html(self.find('.name').html());
    globals.active_bio.find('.title').html(self.find('.title').html());
    globals.active_bio.find('.short-bio').html(self.find('.short-bio').html());
    //globals.active_bio.find('img').attr('src', $source_bio.find('img').attr('src'));

    globals.active_bio.pixellate('out');  // explode top/active page image via $pixel array, update spans.

    //$source_bio.find('.image').pixellate('out');

  });
};
