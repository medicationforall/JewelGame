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
    var header = new Header();
    var hamburgerMenu = new HamburgerMenu();
    var screenControl = new ScreenControl();
    screenControl.add(Game);
    screenControl.add(LevelSelect);
    screenControl.add(EndLevel);
});
