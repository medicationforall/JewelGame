/**
 *   Jewel Game source file NameControl,
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
function NameControl(){
  this.template='<div class="control">Name: <input name="levelName" style="width:100px;margin-left:3px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.name='';


  /**
   *
   */
  this.node.find('input[name="levelName"]').on('input',$.proxy(function(editor){
    $(this).removeClass('error');
    var value = $(this).val();
    //console.log('level name is is',value);
    editor.setName(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setName=function(name){
    this.name=name;
    this.node.find('input[name="levelName"]').val(name);
  };


  /**
   *
   */
  this.getName=function(){
    return this.name;
  };


  /**
   *
   */
  this.error=function(){
    this.node.find('input[name="levelName"]').addClass('error');
  };
}
