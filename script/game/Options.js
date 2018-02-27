/**
 *   Jewel Game source file Options,
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
 * Options screen.
 * @class
 */
function Options(){
  this.template='<div class="options screen">'+
  '<h2>Options</h2>'+
  '<div>'+
  'Play Speed:<div class="playSpeedContainer"><span class="playSpeed">2</span><br /><input name="playSpeed" type="range" min="0.1" max="10" step="0.1" value="2.0" /></div>'+
  '</div><br />'+
  '<a href="" class="apply button">Apply</a> '+
  '<a href="" class="reset button">Reset</a>'+
  '</div>';
  this.node = $(this.template);
  this.node.data('node',this);
  this.playSpeed = 2;


  /**
   *
   */
  this.node.on('input','input[name="playSpeed"]',$.proxy(function(options,event){
    var value = $(this).val();
    options.setPlaySpeed(value);
    options.node.find('.apply.button').addClass('changes');
  },null,this));


  /**
   *
   */
  this.setPlaySpeed=function(value){
    this.playSpeed = parseFloat(value).toFixed(1);
    $('.playSpeed').text(this.playSpeed);
  };


  /**
   *
   */
  this.node.on('click','.apply.button',$.proxy(function(options,event){
    event.preventDefault();
    var data = options.getData();

    if($(this).hasClass('changes')){
      $('.game.screen').data('node').setOptions(data);
      $(this).removeClass('changes');
    }else{
      console.log('no changes marked to be applied.');
    }
  },null,this));


  /**
   *
   */
  this.node.on('click','.reset.button',$.proxy(function(options,event){
    event.preventDefault();
    options.reset();
    var data = options.getData();

    $('.game.screen').data('node').setOptions(data);
  },null,this));


  /**
   *
   */
  this.getData=function(){
    var data = {};
    data.playSpeed = this.playSpeed;
    return data;
  };


  /**
   *
   */
  this.setOptionsFromData=function(options){
    this.setPlaySpeed(options.playSpeed);
    this.node.find('input[name="playSpeed"]').val(this.playSpeed);
  };


  /**
   *
   */
  this.reset=function(){
    this.setPlaySpeed(2);
    this.node.find('input[name="playSpeed"]').val(this.playSpeed);
  };
}
