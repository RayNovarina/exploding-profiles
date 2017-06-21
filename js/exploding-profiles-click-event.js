
function exp_add_click_handler( $active_bio, profile_idx, profile_div) {
  // alert( index + ": " + $(el).attr('id') );
  $(profile_div).click(function(attribs) {
    var self = $(attribs.currentTarget);
    //alert( 'Clicked on \'' + self.attr('id') + '\'' +
    //       '.  Active halftone profile: ' + $active_bio.attr('active_idx') + ':' + $active_bio.attr('active_id')
    //);
    $source_bio = $( $('.bio-container').toArray() [ parseInt(self.attr('bio-idx')) ] );
    $active_bio.attr('active_id', $source_bio.attr('id'));
    $active_bio.attr('active_idx', $source_bio.attr('bio-idx'));
    $active_bio.find('.name').html($source_bio.find('.name').html());
    $active_bio.find('.title').html($source_bio.find('.title').html());
    $active_bio.find('.short-bio').html($source_bio.find('.short-bio').html());
    $active_bio.find('img').attr('src', $source_bio.find('img').attr('src'));

    $active_bio.find('.image').pixellate('out');  // explode top/active page image via $pixel array, update spans.
    $source_bio.find('.image').pixellate('out');
    //$img_div.pixellate('in');   // recreate from $pixel for initial view.

  });
};
