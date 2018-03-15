/**
 *   Jewel Game source file StartBlocks,
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
 * Used for setting the starting blocks.
 * @class
 */
function StartBlocks(){
  this.template='<div class="control startBlocksSelect">'+
    'Start Blocks:'+
    '<a href="" class="snapshot button" title="Snapshot board">'+
    '<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;">'+
    '<path d="M41 122.496v14h62v-14zm154.73 0l-32 32H137v46h30.682C192.4 159.898 237.08 132.738 288 132.738c50.92 0 95.6 27.16 120.318 67.758H487v-46h-74.73l-32-32c-92.27-9-92.27-9-184.54 0zM288 150.738c-67.903 0-122.758 54.855-122.758 122.758 0 67.903 '+
    '54.855 122.758 122.758 122.758 67.903 0 122.758-54.855 122.758-122.758 0-67.903-54.855-122.758-122.758-122.758zm-263 3.758v46h94v-46zm263 14.713c57.49 0 104.287 46.796 104.287 104.286S345.49 377.783 288 377.783c-57.49 0-104.287-46.797-104.287-104.287 0-57.49 46.797-104.287 104.287-104.287zm-21.787 22.042c-12.173.42-25.717 6.526-36.78 16.578-20.025 18.19-26.342 43.853-14.11 57.318 12.232 13.465 38.38 9.634 58.406-8.558 20.023-18.192 26.34-43.855 14.108-57.32-5-5.504-12.62-8.33-21.625-8.018zM25 218.496v142h94v-142zm112 0v142h40.412c-18.888-23.96-30.17-54.183-30.17-87 0-19.507 3.988-38.096 11.188-55zm280.57 0c7.2 16.904 11.188 35.493 11.188 55 0 32.817-11.282 63.04-30.17 87H487v-142zM25 378.496v14h94v-14zm112 0v14h75.89c-6.567-4.158-12.763-8.846-18.536-14zm244.646 0c-5.773 5.154-11.97 9.842-18.535 14H487v-14z" fill="" fill-opacity="1"></path></g></svg>'+
    '</a><br />'+
    '<select name="startColor">'+
    '<option value="red" class="red">Red</option>'+
    '<option value="orange" class="orange">Orange</option>'+
    '<option value="yellow" class="yellow">Yellow</option>'+
    '<option vlaue="green" class="green">Green</option>'+
    '<option value="blue" class="blue">Blue</option>'+
    '<option value="purple" class="purple">Purple</option>'+
    '<option value="rainbow" class="rainbow">Rainbow</option>'+
    '<option value="stone" class="stone">Stone</option>'+
    '<option value="warp" class="warp">Warp</option>'+
    '<option value="random">Random</option>'+
    '</select>'+
    '<select name="startShape">'+
    '<option value="triangle">Triangle</option>'+
    '<option value="square">Square</option>'+
    '<option value="pentagon">Pentagon</option>'+
    '<option value="circle">Circle</option>'+
    '<option value="rabbet">Rabbet</option>'+
    '<option value="star">Star</option>'+
    '<option value="random">Random</option>'+
    '</select>'+
    '<a href="" class="addStartBlock button" title="Add Block">'+
    '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg></a>'+
    '<div class="startBlocksList">'+
    '</div>'+
    '</div>';
  this.node = $(this.template);
  this.node.data('node',this);

  this.startBlocks=[];


  /**
   * Double Clicking on a start block removes it.
   */
  this.node.find('.startBlocksList').on('dblclick','.startBlock',$.proxy(function(editor,event){
    console.log('double clicked start block');
    $(this).remove();
    editor.updateStartBlocks();
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Look at the existing board and copy it block for block into the startBlocks array.
   */
  this.node.find('.snapshot.button').on('click',$.proxy(function(event){
    event.preventDefault();
    var board = this.node.closest('.levelEditor').find('.board').data('node');
    var children = board.node.children();

    for(var i=0,space;(space=children[i]);i++){
      if(space.tagName==='DIV'){
        var data = $(space).data('node').getData();
        this.addStartBlock(data);
      }
    }
    console.log('clicked snapshot');
  },this));


  /**
   * Adda start Block click.
   */
  this.node.find('.addStartBlock.button').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var shape = editor.node.find('select[name="startShape"]').val();
    var color = editor.node.find('select[name="startColor"]').val();
    var data = {"shape":shape,"color":color};
    console.log('clicked add start block button',shape,color);

    editor.addStartBlock(data);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Make the startBlocks sortable.
   */
  this.node.find('.startBlocksList').sortable({update:$.proxy(function(){
    console.log('update');
    this.changeStartBlockOrder();
  },this)});


  /**
   * Change the start block order.
   */
  this.changeStartBlockOrder=function(){
    console.log('change start block order');
    this.updateStartBlocks();
    this.node.parent().data('node').updateBoard();
  };


  /**
   * Update the stored start blocks array.
   */
  this.updateStartBlocks=function(){
    this.startBlocks=[];
    var startBlocks = this.node.find('.startBlock');

    for(var i=0,startBlock;(startBlock=startBlocks[i]);i++){
      var data = {};
      data.shape=$(startBlock).data('shape');
      data.color=$(startBlock).data('color');
      this.startBlocks.push(data);
    }
  };


  /**
   * Add a start block.
   * @param {object} data example {"shape":"square","color":"red"}
   */
  this.addStartBlock=function(data){
      this.startBlocks.push(data);
      this.node.find('.startBlocksList').append('<div class="startBlock '+data.shape+' '+data.color+'" data-shape="'+data.shape+'" data-color="'+data.color+'"></div>');
  };


  /**
   * Get the array of start blocks
   * @return {array}
   */
  this.getStartBlocks=function(){
    return this.startBlocks;
  };


  /**
   * Set the start blocks.
   * @param {array} startBlocks
   */
  this.setStartBlocks=function(startBlocks){
    //reset
    this.startBlocks=[];
    for(var i=0,startBlock;(startBlock=startBlocks[i]);i++){
      this.addStartBlock(startBlock);
    }
  };
}
