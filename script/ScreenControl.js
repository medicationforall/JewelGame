/**
 *   Jewel Game source file ScreenControl,
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
function ScreenControl(){
  this.node = $('.screenControl');
  this.node.data('node',this);


  /**
   *
   */
  this.displayScreen=function(screenName){
    //console.log('display screen',screenName);
    this.node.find('.screen').removeClass('display');
    this.node.find('.'+screenName).addClass('display');
    $('.header').data('node').displayMenu(screenName);
  };


  /**
   *
   */
  this.add=function(classObject){
    var screen = new classObject();
    this.node.append(screen.node);
  };
}
