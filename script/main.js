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
    screenControl.add(About);
});
