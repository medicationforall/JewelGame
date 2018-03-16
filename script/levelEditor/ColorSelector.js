/**
 *   Jewel Game source file ColorSelector,
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
 * Level Editor color selector.
 * @class
 */
function ColorSelector(){
  this.template=  '<div class="control">'+
    'Colors:'+
    '<select name="colorSelect" style="margin-left:5px">'+
    '<option value="red">Red</option>'+
    '<option value="orange">Orange</option>'+
    '<option value="yellow">Yellow</option>'+
    '<option value="green">Green</option>'+
    '<option value="blue">Blue</option>'+
    '<option value="purple">Purple</option>'+
    '<option value="rainbow">Rainbow</option>'+
    '<option value="stone">Stone</option>'+
    '<option value="warp">Warp</option>'+
    '</select>'+
    '<a href="" class="addColor button" title="Add Color">'+
    '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>'+
    '</a>'+

    '<div class="control colors">'+
    '<div class="colorSelection red" data-color="red"></div>'+
    '<div class="colorSelection orange" data-color="orange"></div>'+
    '<div class="colorSelection yellow" data-color="yellow"></div>'+
    '<div class="colorSelection green" data-color="green"></div>'+
    '<div class="colorSelection blue" data-color="blue"></div>'+
    '<div class="colorSelection purple" data-color="purple"></div>'+
    '</div>'+
    '</div>';
  this.node=$(this.template);
  this.node.data('node',this);

  this.colors=['red','orange','yellow','green','blue','purple'];


  /**
   * Make colors sortable.
   */
  this.node.find('.colors.control').sortable({update:$.proxy(function(){
    console.log('update color order');
    this.changeColorOrder();
  },this)});


  /**
   * Double clicking on a color deletes it.
   */
  this.node.find('.colors.control').on('dblclick','.colorSelection',$.proxy(function(editor,event){
    console.log('double clicked colorSelection');
    $(this).remove();
    editor.updateColors();
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Change the color order.
   */
  this.changeColorOrder=function(event,ui){
    console.log('change color order');
    this.updateColors();
    this.node.parent().data('node').updateBoard();
  };


  /**
   * Update the colors.
   */
  this.updateColors=function(){
      this.colors=[];
      var colors = this.node.find('.colorSelection');

      for(var i=0,color;(color=colors[i]);i++){
        this.colors.push($(color).data('color'));
      }
  };


  /**
   * Add color click.
   */
  this.node.find('.addColor').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var value = editor.node.find('select[name="colorSelect"]').val();
    console.log('clicked add color',value);

    editor.addColor(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Set colors.
   * @param {array} colors ['red','orange','yellow','green','blue','purple']
   */
  this.setColors=function(colors){
    //reset
    this.colors=[];
    this.node.find('.colors.control .colorSelection').remove();

    for(var i=0,color;(color=colors[i]);i++){
      this.addColor(color);
    }
  };


  /**
   * Add a color.
   */
  this.addColor=function(color){
    this.colors.push(color);
    this.node.find('.colors.control').append('<div class="colorSelection '+color+'" data-color="'+color+'"></div>');
  };


  /**
   * Get colors.
   * @return {array} The array of colors.
   */
  this.getColors=function(){
    return this.colors;
  };
}
