/**
 *   Jewel Game source file Space,
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
  * Space on a Board, manages jewel state.
  * @class
  * @param  {string} color Initial color.
  * @param  {string} shape Initial shape.
  * @param  {int} index Reference position.
  */
function Space(color,shape,index){
  this.color = color;
  this.shape = shape;
  this.template = '<div class="space">'+
  '<span class="token '+shape+' '+color+'" data-color="'+color+'" data-shape="'+shape+'"></span>'+
  '<span class="highlight"></span>'+
  '<span class="outline '+shape+'"></span>'+
  '<span class="shadow '+shape+'"></span>'+
  '</div>';

  this.index = index;
  this.node=$(this.template);
  this.node.data('node',this);


  /**
   * Get the Spaces data.
   * @public
   * @returns {Object} data representation of what's in the space.
   */
  this.getData=function(){
    if(this.color && this.shape){
      var data = {};
      data.color = this.color;
      data.shape = this.shape;
      return data;
    }else{
      return undefined;
    }
  };


  /**
   * Set the Spaces data.
   * @public
   * @param {Object} data Information of what the space should change to.
   */
  this.setData=function(data){
    if(data!==undefined && data.empty!==true){
      this.node.find('.token').removeClass('remove');
      this.node.find('.highlight,.token,.shadow,.outline').css('display','');
      this._setColor(data.color);
      this._setShape(data.shape);

      if(data.drop && data.drop > 0){
        this.node.find('.highlight,.token,.shadow,.outline').addClass('noTransition');
        $.when(this._setDrop(data.drop)).done($.proxy(function(){
          this.node.find('.highlight,.token,.shadow,.outline').removeClass('noTransition');
        },this));
      }
    }else{
      this._empty(data);
    }
  };


  /**
   * Empty the space.
   * @private
   * @param {Object} data state change data.
   */
  this._empty=function(data){
    this.color = undefined;
    this.shape = undefined;
    this.node.find('.highlight,.token,.shadow,.outline').addClass('remove').css('display','none');
  };


  /**
   * Set the drop animation.
   * @private
   * @param {int} drop How far to drop the token onto the board.
   */
  this._setDrop=function(drop){
    if(drop > 9){
      drop = 9;
    }

    var token = this.node.find('.highlight,.token,.shadow,.outline');
    return token.animateCss('drop'+drop);
  };


  /**
   * Set the spaces color.
   * @param {string} color
   */
  this._setColor=function(color){
    if(color !== this.color){
      this.color = color;
      this.node.find('.token').attr('data-color',this.color);
      this.node.find('.token').removeClass('red blue green purple orange yellow stone ice fire rainbow');
      this.node.find('.token').transitionCss(this.color);
    }
  };


  /**
   * Set the space shape.
   * @param {string} shape
   */
  this._setShape=function(shape){
    if(shape !== this.shape){
      this._animateShapeChange(shape);
      this.node.find('.token').attr('data-shape',shape);
      this.node.find('.token,.shadow,.outline').removeClass('square circle triangle pentagon rabbet star');

      this.shape = shape;
      this.node.find('.token,.shadow,.outline').addClass(this.shape);
    }
  };


  /**
   * Animate shape change.
   * @private
   * @param {int} shape that the space is going to.
   */
  this._animateShapeChange=function(shape){
    var fromShapes = ['square','rabbet','triangle','pentagon','star'];
    var token =this.node.find('.token,.shadow,.outline');

    for(var i=0,fromShape;(fromShape=fromShapes[i]);i++){
      if(fromShape !== shape && shape !== 'circle' && token.hasClass(fromShape)){
        var animationClass = fromShape+'-to-'+shape;
        token.animateCss(animationClass);
      }
    }
  };


  /**
   * Mark the space as selected.
   * @public
   */
  this.selectToken=function(){
    if(this.node.hasClass('selected')===false){
      this.node.addClass('selected');
    } else{
      this.node.removeClass('selected');
    }
  };


  /**
   * Mark the space as unselected.
   * @public
   */
  this.unselectToken=function(){
    if(this.node.hasClass('selected')){
      this.node.removeClass('selected');
    }
  };


  /**
   * Get the reference index for the space.
   * @public
   */
  this.getIndex=function(){
    return this.index;
  };
}
