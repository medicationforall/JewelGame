/**
 *   Jewel Game source file WidthControl,
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
 * Used for setting board width i.e. the number of block columns.
 * @class
 */
function WidthControl(){
  this.template= '<div class="control">Width: <input name="width" type="number" min="3" value="3" style="width:50px;margin-left:5px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.width=3;


  /**
   * Width textbox input.
   */
  this.node.find('input[name="width"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('width is',value);
    editor.setWidth(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Set the width.
   * @public
   * @param {int} width
   */
  this.setWidth=function(width){
    this.width=width;
    this.node.find('input[name="width"]').val(width);
  };


  /**
   * Get the width.
   * @public
   * @return {int}
   */
  this.getWidth=function(){
    return this.width;
  };
}
