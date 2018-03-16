/**
 *   Jewel Game source file SeedControl,
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
function SeedControl(){
  this.template='<div class="control">Seed: <input name="seed" style="width:100px;margin-left:9px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.seed='';


  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    //console.log('seed is',value);
    editor.setSeed(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setSeed=function(seed){
    this.seed=seed;
    this.node.find('input[name="seed"]').val(seed);
  };


  /**
   *
   */
  this.getSeed=function(){
    return this.seed;
  };

}
