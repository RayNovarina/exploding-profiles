function exp_statusLog( msg, plugIn) {
  // if ( msg == 'init-done')
  // if ( msg == 'cycle-done')
  if ( msg == "init-done" ) {
    globals.status_msgs_class_ref = globals.cycle_msgs_class_ref;
  } else {
    $( globals.status_msgs_class_ref ).append( msg );
  }
};

var globals = {
    pluginName: 'pixellate',
    pluginInstanceName: 'plugin_pixellate',

    init_msgs_class_ref: '.init-status',
    cycle_msgs_class_ref: '.cycle-status',
    status_msgs_class_ref: '.init-status',

    pixellate_class: 'profile-container',
    pixellate_class_ref: '.profile-container',
    pixellate_elem_def: 'div class="profile-container"',
    pixellate_photo_class_ref: '.bio-photo',
    pixellate_pixels_container_class_ref: '.bio-pixell-array',

    defaults: {
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

      active_profile_idx: 0
    }
  };
exp_statusLog( "  ..*4-global data done*" );
