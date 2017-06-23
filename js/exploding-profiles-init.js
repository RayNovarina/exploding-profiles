
function exp_init() {
  // hide current page contents:
};

function exp_convert_data_to_html() {
  // Bind events and initialize plugin
  /*
  <div class="profile-container">
    <div class="profile-photo">
      <img src="../images/jamer_hunt.jpg" />
    </div>
    <div class="info">
      <div class="name">Jamer Hunt</div>
      <div class="title">Grunt 2</div>
    </div>
    <div class="short-bio">
      Jamar is Grunt 2. He sorta leads the The Climate Corporation's Engineering team. He has more than 15 years of experience leading the development of large-scale systems in a variety of industries. Prior to The Climate Corporation, Brian worked at Orbitz as a Senior Architect responsible for the development of their distributed service platform and overall architecture. Before Orbitz, Brian worked at the investment bank UBS where he built global interest rate trading systems. He has contributed frequently to the open source community, including having been the lead developer for the Jython project. He holds a B.S. in Finance from the University of Illinois at Champaign.
    </div>
    <div class="bio-photo">
      <img src="../images/jamar_hunt-halftone-image-generator.png" />
    </div>
  </div>
  */

  exp_statusLog( "  ..*13: exp_init(): START data to html conversion.*" );
  globals.active_bio = $('.bio-active');
  $.each( $( '.profile-container' ).toArray(), function( index, el ) {
    var name = $(el).find( '.name' ).html().split(' ')[0].toLowerCase();
    $(el).attr( 'id', ('profile-' + (index + '') + '-' + name) );
    $(el).attr('profile-idx', index + '');
    $(el).attr( 'profile-name', name );
    if (index > 0) {
      $( ".init-status" ).addClass('status-ignore');
    }
    $(el).pixellate(''); // chop up bio image into $pixel <span> array.
    $(el).pixellate('out'); // initial state is an exploded image.
    exp_add_click_handler( globals.active_bio, index, el);
  });
  $( ".init-status" ).removeClass('status-ignore');

  /*
  $.each( $( '.bio-container' ).toArray(), function( index, el ) {
    img_src = $(el).find('img').attr('src');
    name = img_src.slice( img_src.indexOf('/images') + ('/images'.length + 1), img_src.indexOf('_') );
    $(el).attr( 'id', ('bio-' + (index + '') + '-' + name) );
    $(el).attr('bio-idx', index + '');
    $(el).attr('profile-idx', index - 1 + ''); // first bio is sandbox.
    //$(el).find('.image').addClass(globals.defaults.pixellate_class);
  });
  */

  exp_statusLog( "  ..*14: exp_init(): END data to html conversion.*" );
};

function exp_build_default_view() {
  exp_statusLog( "  ..*15: exp_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );
  globals.default_profile = $( $('.profile-container').toArray()[globals.defaults.active_profile_idx] );

  globals.active_bio.attr('active_id', globals.default_profile.attr('id'));
  globals.active_bio.attr('active_idx', globals.default_profile.attr('profile-idx'));
  globals.active_bio.find('.name').html(globals.default_profile.find('.name').html());
  globals.active_bio.find('.title').html(globals.default_profile.find('.title').html());
  globals.active_bio.find('.short-bio').html(globals.default_profile.find('.short-bio').html());

  var name = globals.default_profile.find( '.name' ).html().split(' ')[0].toLowerCase();
  globals.active_bio.attr('id', ('active_bio_for_profile-' + (globals.defaults.active_profile_idx + '') + '-' + name) );
  globals.active_bio.find('.name').html(globals.default_profile.find('.name').html());
  globals.active_bio.attr( 'bio-name', name );
  /*
  <div class="col-sm-5">
    // bio-container bio-active
    <div class="bio-background-image"></div>
    // profile-container
    <div class="short-bio"></div>
    <div class="bio-photo">
      <img src="../images/laura_oliphant-halftone-image-generator-smart-2-bright-verysmall.png"/>
    </div>
    <div class="bio-pixell-array"></div>
  </div>
   */

  // 1a) Move original halftone-profile image file into bio display page.
  // 'div.bio-container'.bio-active'.find('
  //                    .bio-background-image')
  //                    .append( 'div.profile-container id="gina"'.find(
  //                             '.bio-photo') );
  //
  //globals.active_bio.find( globals.pixellate_target_class_ref )
  //                  .append( globals.default_profile.find(globals.pixellate_photo_class_ref ) );

  // 1b) Move profile pixell array of spans into bio display page.
  // 'div.bio-container'.bio-active'.find('
  //                    .bio-background-image')
  //                    .append( 'div.profile-container id="gina"'.find(
  //                             '.bio-pixell-array') );
  //
  //globals.active_bio.find( globals.pixellate_target_class_ref )
  //                  .append( globals.default_profile.find(globals.pixellate_pixels_container_class_ref ) );

  // 2) Wait two seconds and chop up bio image into bio-active-container $pixel <span> array.
  setTimeout(function() {
    globals.active_bio.pixellate('');
    // 3) Wait two more seconds and Put the original halftone-profile image file back to the profile page.
    setTimeout(function() {
      globals.active_bio.find( '.bio-photo' )
                        .insertAfter( globals.default_profile.find('.short-bio') );
      // 4) Wait two more seconds and explode the halftone image.
      setTimeout(function() {
        globals.active_bio.pixellate( 'out' );
        // 5) Wait four more seconds and implode/rebuild halftone image.
        setTimeout(function() {
          globals.active_bio.pixellate( 'in' );
        }, 4000);
      }, 2000);
    }, 2000);
}, 2000);

  // 2) Wait two seconds and Move pixellated image into bio display page.
  //setTimeout(function() {
    // NOTE: initial state of default profile is an exploded image.
    // 2a) implode back to pixellated image.
    //globals.default_profile.pixellate( 'in' );
    // 2b) Put the original halftone-profile image file back to the profile page.
    //globals.active_bio.find( '.bio-photo' )
    //                  .insertAfter( globals.default_profile.find('.short-bio') );
    // 2c) Move pixellated image into bio display page.
    //globals.active_bio.find( '.bio-background-image' )
    //                  .append( globals.default_profile.find('.bio-pixell-array' ) );
    // 3) Wait two more seconds and explode halftone image.
  //  setTimeout(function() {
    //  globals.active_bio.pixellate( 'in' );
    //  globals.active_bio.pixellate( 'out' );
    //  // 4) Wait one more second and rebuild halftone image.
    //  setTimeout(function() {
    //    globals.active_bio.pixellate( 'in' );
    //  }, 1000);
  //  }, 2000);
  // }, 2000);
};
