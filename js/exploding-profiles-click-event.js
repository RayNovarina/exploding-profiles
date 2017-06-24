
function exp_add_click_handler( profile_idx, profile_div) {
  $(profile_div).click(function(attribs) {
    var self = $(attribs.currentTarget);
    //alert( 'Clicked on \'' + self.attr('id') + '\'' +
    //       '.  Active halftone profile: ' + globals.active_bio.attr('active_idx') + ':' + globals.active_bio.attr('active_id')
    //);
    var clicked_profile_idx = parseInt( self.attr('profile-idx') ),
        active_bio_idx = parseInt( $( globals.bio_containers_class_ref ).attr('active_bio_idx') ),
        active_bio = $( $('.bio-container').toArray()[ active_bio_idx ] );

    $( ".cycle-status" ).html( "<br />" + "**" + self.attr('id') + "**..." ); // Reset msg area, erase old.
    exp_statusLog( "  ..*16  Clicked on '" + self.attr('id') +
                   "'.  Active halftone profile: " + active_bio.attr('active_idx') + ":" +
                   active_bio.attr('active_id') + "*" );

    // explode halftone image background of active bio, restore updated content
    // of active bio to its profile.
    swap_out_bio( active_bio_idx , 'explode', 1500,
    /*1-Callback when done*/ function() {
    // swap in clicked profile into active bio slot, implode/recreate the bio image.
    swap_in_bio( clicked_profile_idx, 'implode', 0, '',
    /*2-Callback when done*/ function() {
    /*2-*/})/*1-*/});
  });
};
