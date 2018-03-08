/**
 *   Jewel Game source file Header,
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
 * Page header.
 * @class
 */
function Header(){
  this.node = $('.header');
  this.node.data('node',this);


  /**
   * Display particular header depending upon screen context.
   * @param {string} menuName class name of the menu to display.
   */
  this.displayMenu=function(menuName){
    this.node.find('.menuScreen').removeClass('display');
    this.node.find('.'+menuName).addClass('display');
  };


  /**
   * Click on the hamburger icon.
   */
  this.node.on('click','.hamburger',$.proxy(function(event){
    event.preventDefault();
    $('.hamburgerMenu').data('node').toggleHamburger();
  }));
}
