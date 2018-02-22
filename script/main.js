/**
 *   Jewel Game source file main,
 *   Copyright (C) 2018  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Extentions on jquery for picking up when css animations and transitions are finished.
 */
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

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 * @see https://stackoverflow.com/a/21712356
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

/**
 * Main run once everything is loaded.
 */
$(document).ready(function(){
    //remove the javascript warning.
    if(detectIE()===false){
      $('.javascriptWarning').remove();
    }{
      $('.javascriptWarning').text('This web application dooes not fully support Internet Explorer / Edge.');
    }

    var header = new Header();
    var hamburgerMenu = new HamburgerMenu();
    var screenControl = new ScreenControl();
    $('body').append(screenControl.node);
    screenControl.add(Game);
    screenControl.add(LevelSelect);
    screenControl.add(EndLevel);
    screenControl.add(Options);
    //screenControl.add(Stats);
    screenControl.add(About);
});
