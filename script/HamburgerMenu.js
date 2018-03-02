/**
 *   Jewel Game source file Hamburger Menu,
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
 * Hambuger Menu and options.
 * @class
 */
function HamburgerMenu(){
  this.node = $('.hamburgerMenu');
  this.node.data('node',this);

  /**
   *
   */
  this.node.on('click','.restartLevel',$.proxy(function(hamburgerMenu,event){
    event.preventDefault();
    $('.board').data('node').killWorkers();
    $('.game.screen').data('node').restartLevel();
    var screenControl = $('.screenControl').data('node');
    screenControl.displayScreen('game');
  },null,this));


  /**
   *
   */
  this.node.on('click','.screenLink',$.proxy(function(hamburgerMenu,event){
    event.preventDefault();
    var screenName = $(this).data('screen');
    var screenControl = $('.screenControl').data('node');
    screenControl.displayScreen(screenName);
    hamburgerMenu.toggleHamburger();
  },null,this));


  /**
   *
   */
  this.node.on('click','.closeHamburger',$.proxy(function(hamburgerMenu,event){
    event.preventDefault();
    hamburgerMenu.toggleHamburger();
  },null,this));


  /**
   *
   */
  this.toggleHamburger=function(){
    if(this.node.hasClass('display')===false){
      this.node.addClass('display').animateCss('slideInRight');
    }else{
      this.node.removeClass('display');
    }
  };
}
