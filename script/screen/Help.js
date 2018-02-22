/**
 *   Jewel Game source file Help,
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
 * Help screen.
 * @class
 */
function Help(){
  this.template='<div class="about screen">'+
  '<h2>Help</h2>'+
  '<h3>Game</h3>'+
  '<h3>Level Select</h3>'+
  '<h3>Options</h3>'+
  '</div>';
  this.node=$(this.template);
  this.node.data('node',this);
}
