/**
 *   Jewel Game source file ShapeSelector,
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
 * Used for setting the up available shapes that populate the board.
 * @class
 */
function ShapeSelector(){
  this.template=  '<div class="control">'+
    'Shapes:'+
    '<select name="shapeSelect">'+
    '<option value="triangle">Triangle</option>'+
    '<option value="square">Square</option>'+
    '<option value="pentagon">Pentagon</option>'+
    '<option value="circle">Circle</option>'+
    '<option value="rabbet">Rabbet</option>'+
    '<option value="star">Star</option>'+
    '</select>'+
    '<a href="" class="addShape button">'+
    '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>'+
    '</a>'+
    '<div class="control shapes">'+
    '<div class="shapeSelection triangle" data-shape="triangle"></div>'+
    '<div class="shapeSelection square" data-shape="square"></div>'+
    '<div class="shapeSelection pentagon" data-shape="pentagon"></div>'+
    '<div class="shapeSelection circle" data-shape="circle"></div>'+
    '<div class="shapeSelection rabbet" data-shape="rabbet"></div>'+
    '</div>'+
    '</div>';
  this.node=$(this.template);
  this.node.data('node',this);

  this.shapes=['triangle','square','pentagon','circle','rabbet'];


  /**
   * The shapes can be re-ordered.
   */
  this.node.find('.shapes.control').sortable({update:$.proxy(function(){
    console.log('update shapes order');
    this.changeShapeOrder();
  },this)});


  /**
   * Double clicking on a shape removes it.
   */
  this.node.find('.shapes.control').on('dblclick','.shapeSelection',$.proxy(function(editor,event){
    console.log('double clicked shapeSelection');
    $(this).remove();
    editor.updateShapes();
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Change shape order.
   */
  this.changeShapeOrder=function(event,ui){
    console.log('change shape order');
    this.updateShapes();
    this.node.parent().data('node').updateBoard();
  };


  /**
   * Update the shapes array.
   */
  this.updateShapes=function(){
      this.shapes=[];
      var shapes = this.node.find('.shapeSelection');

      for(var i=0,shape;(shape=shapes[i]);i++){
        this.shapes.push($(shape).data('shape'));
      }
  };


  /**
   * Add shape click.
   */
  this.node.find('.addShape').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var value = editor.node.find('select[name="shapeSelect"]').val();
    console.log('clicked add shape',value);

    editor.addShape(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Set the shapes array.
   * @param {array} shapes
   */
  this.setShapes=function(shapes){
    //reset
    this.shapes=[];
    this.node.find('.shapes.control .shapeSelection').remove();

    for(var i=0,shape;(shape=shapes[i]);i++){
      this.addShape(shape);
    }
  };


  /**
   * Add shape to the array
   * @param {string} shape
   */
  this.addShape=function(shape){
    this.shapes.push(shape);
    this.node.find('.shapes.control').append('<div class="shapeSelection '+shape+'" data-shape="'+shape+'"></div>');
  };


  /**
   *
   */
  this.getShapes=function(){
    return this.shapes;
  };
}
