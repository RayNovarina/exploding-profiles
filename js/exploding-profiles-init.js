
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

  $.each( $( '.profile-container' ).toArray(), function( index, el ) {
    var name = $(el).find( '.name' ).html().split(' ')[0].toLowerCase();
    $(el).attr( 'id', ('profile-' + (index + '') + '-' + name) );
    $(el).attr('profile-idx', index + '');
    $(el).attr( 'profile-name', name );
    if (index > 0) {
      $( ".init-status" ).addClass('status-ignore');
    }
    $(el).pixellate('', $(el)); // chop up bio image into 'div.profile-container.bio-pixell-array' $pixel <span> array.
    $(el).pixellate('out', $(el)); // initial state is an exploded image.
    exp_add_click_handler( index, el);
  });
  $( ".init-status" ).removeClass('status-ignore');
  exp_statusLog( "  ..*14: exp_init(): END data to html conversion.*" );
};

function exp_build_default_view() {
  exp_statusLog( "  ..*15: exp_init(): Create default bio image from profile " + globals.defaults.active_profile_idx + ".*" );
  $( globals.bio_containers_class_ref ).attr('active_bio_idx', globals.defaults.active_bio_idx + '');
  // Put default profile into bio page, implode/create its bio image.
  swap_in_bio( globals.defaults.active_profile_idx, 'implode', 0,
  /*1-Callback when done*/ function() {
  /*1-*/}); 
};
