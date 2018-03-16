/**
 *   Jewel Game source file HeightControl,
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
 * Height of the gameboard control i.e. the number of block rows.
 * @class
 */
function HeightControl(){
  this.template='<div class="control">Height: <input name="height" type="number" min="3" value="3" style="width:50px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.height=3;


  /**
   * Height value input change.
   */
  this.node.find('input[name="height"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('height is',value);
    editor.setHeight(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Set board height.
   * @param {int}
   */
  this.setHeight=function(height){
    this.height=height;
    this.node.find('input[name="height"]').val(height);
  };


  /**
   * Get the board height.
   * @return {int}
   */
  this.getHeight=function(){
    return this.height;
  };
}
