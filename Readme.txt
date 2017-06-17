based on:
https://codepen.io/anon/pen/rwWGME
http://www.hongkiat.com/blog/less-basic/
http://getbootstrap.com/getting-started/#template

http://www.picturetopeople.org/image_effects/photo-halftone/halftone-image-generator.html

https://www.climate.com/about/leadership

local dev path: /Applications/MAMP/htdocs/Sites/translarity/Readme.txt

browser access: start OSX Mamp. Apache server at localhost:8888
  browser only access: http://localhost:8888/Sites/translarity/index.html.en

=========================================
test images:

<!-- img src="http://lorempixel.com/500/500" -->
<!-- img src="./may_2017_ray_IMG_2700.jpg" -->
<img src="./may_2017_ray_halftone-image-generator.png" />

=========================================


<div class="status">
  *1-uponLoad*
</div>

<div class="profile">
  <img src="./5580042-profile-pictures.jpg"
       height="140px;" width="140px;" >
  <img src="./may_2017_ray_IMG_2700.jpg"
       height="140px;" width="140px;" >
</div>

<div class="explode">
  <!-- img src="http://lorempixel.com/500/500" -->
  <!-- img src="./may_2017_ray_IMG_2700.jpg" -->
  <!-- img src="./may_2017_ray_halftone-image-generator.png" -->
  <!-- img src="./5580042-profile-pictures.jpg" -->
  <!-- img src="./5580042-profile-pictures.svg" -->
  <img src="./5580042-profile-pictures_halftone-image-generator.png" >
  <!-- img src="./halftone-image-generator.png" -->
</div>


<script>
$(function() {
  // Bind events and initialize plugin
  $(.'status').innerHTML = '*2-domReady*';
  $('.explode')
    .on('pixellate-exploded', function() {
      var self = this;
      setTimeout(function() {
        $(self).pixellate('in');
      }, 500);
    })
    .on('pixellate-imploded', function() {
      var self = this;
      setTimeout(function() {
       $(self).pixellate('out');
      }, 2000);
    })
    .pixellate()
});
