$.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    },

    transitionCss: function (className) {
      var animationEnd = 'transitionend';
      $(this).addClass(className).one(animationEnd, function() {
      });
    }
});

$(document).ready(function(){
    //console.log('main loaded');
    var screenControl = new ScreenControl();
    var game = new Game();
    var levelSelect = new LevelSelect();
});
