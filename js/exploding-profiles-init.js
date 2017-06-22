
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
    exp_add_click_handler( globals.active_bio, index, el);
  });

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

  globals.default_profile.pixellate(); // chop up bio image into $pixel <span> array.

  globals.active_bio.find('.bio-background-image').append( globals.default_profile.find('.bio-photo') );
};
