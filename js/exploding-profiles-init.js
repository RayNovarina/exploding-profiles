
var exp_pluginName = 'pixellate',
    exp_defaults = {
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
      explosionOrigin: [0,0],

      active_profile_idx: "01"
  };
exp_statusLog( "  ..*4-global data done*" );

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
exp_statusLog( "  ..*12: Add window.request/cancelAnimationFrame()*" );

function exp_init( self ) {
  // Bind events and initialize plugin

      // <div class="row bio-container bio-active" active_id = "" active_idx="">
      //   <div class="col-sm-5">
      //     <div class="info">
      //       <div class="name">name</div>
      //       <div class="title">title</div>
      //       <div class="short-bio">
      //         short-bio
      //       </div>
      //     </div>
      //   </div>
      //   <div class="col-sm-5">
      //     <div class="image">
      //       <img class="profile-photo" src=""/>
      //     </div>
      //   </div>
      // </div>

  exp_statusLog( "  ..*13: exp_init(): START data to html conversion.*" );
  // 'id', 'bio-idx', 'profile-idx' id="bio-01-jamar"
  $.each( $( '.profile-container' ).toArray(), function( index, el ) {
    img_src = $(el).find('img').attr('src');
    name = img_src.slice( img_src.indexOf('/images') + ('/images'.length + 1), img_src.indexOf('_') );
    $(el).attr( 'id', ('profile-' + (index + '') + '-' + name) );
    $(el).attr('profile-idx', index + '');
    $(el).attr('bio-idx', index + 1 + ''); // first bio is sandbox.
  });

  $.each( $( '.bio-container' ).toArray(), function( index, el ) {
    img_src = $(el).find('img').attr('src');
    name = img_src.slice( img_src.indexOf('/images') + ('/images'.length + 1), img_src.indexOf('_') );
    $(el).attr( 'id', ('bio-' + (index + '') + '-' + name) );
    $(el).attr('bio-idx', index + '');
    $(el).attr('profile-idx', index - 1 + ''); // first bio is sandbox.
    $(el).find('.image').addClass('explode');
  });

  var $active_bio = $('.bio-active'),
      $default_bio = $( $('.bio-container').toArray()[parseInt(exp_defaults.active_profile_idx)] );

  $active_bio.attr('active_id', $default_bio.attr('id'));
  $active_bio.attr('active_idx', $default_bio.attr('bio-idx'));
  $active_bio.find('.name').html($default_bio.find('.name').html());
  $active_bio.find('.title').html($default_bio.find('.title').html());
  $active_bio.find('.short-bio').html($default_bio.find('.short-bio').html());
  $active_bio.find('img').attr('src', $default_bio.find('img').attr('src'));

  $.each( $( '.bio-container' ).find('.image').toArray(), function( index, el ) {
    $(el).addClass('explode');
  });
  exp_statusLog( "  ..*14: exp_init(): END data to html conversion.*" );

  exp_statusLog( "  ..*15: exp_init(): Create default bio image.*" );
  var $img_div = $active_bio.find('.image'); // $('.explode');
  //$img_div.pixellate('init'); // fragment image, store in $pixel array as <span> elements.
  //$img_div.removeClass('pixellate-lock');
  $( ".init-status" ).addClass('init-done');
  //$img_div.pixellate('out');  // explode image via $pixel array, update spans.
  $img_div.pixellate('in');   // recreate from $pixel for initial view.
  exp_statusLog( "  ..*3-after domReadyPixellate()*" );

  $.each( $( '.profile-container' ).toArray(), function( index, el ) {
    exp_add_click_handler( $active_bio, index, el);
  });
  //$( ".init-status" ).addClass('init-done');

};
