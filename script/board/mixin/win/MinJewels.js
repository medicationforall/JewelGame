/**
 *   Jewel Game source file MinJewels,
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
function MinJewels(minJewels){
  var endConditionTemplate = 'Minimum Jewels:<span class="value">0</span>';
  this.endCondition = $('.'+this.screen+'.menuScreen .endCondition').append(endConditionTemplate);
  this.tmpJewels=0;
  this.minJewels=0;


  /**
   * Set remaining jewels.
   * @param {int} remainingJewels
   */
  this.setMinJewels=function(minJewels){
    this.minJewels=minJewels;
    this.endCondition.find('.value').text(minJewels);
  };


  /**
   * Called when a jewel is created.
   */
  this.createdJewel=function(){
    this.incrementMinJewels();
  };


  /**
   * Increment jewels counter by one.
   */
  this.incrementMinJewels=function(){
    this.tmpJewels++;
  };


  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpJewels>=this.minJewels){
      return true;
    }else{
      return false;
    }
  };

  this.setMinJewels(minJewels);
}
