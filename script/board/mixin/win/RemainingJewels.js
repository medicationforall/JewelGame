/**
 *   Jewel Game source file RemainingJewels,
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
 * Sets a win condition for the board of remaining jewels.
 * @mixin
 * @param {int} remainingJewels
 */
function RemainingJewels(remainingJewels){
  var endConditionTemplate = 'Remaining Jewels:<span class="value">0</span>';
  this.endCondition = $('.'+this.screen+'.menuScreen .endCondition').append(endConditionTemplate);


  /**
   * Set remaining jewels.
   * @param {int} remainingJewels
   */
  this.setRemainingJewels=function(remainingJewels){
    this.remainingJewels=remainingJewels;
    this.endCondition.find('.value').text(remainingJewels);
  };


  /**
   * Called when a jewel is created.
   */
  this.createdJewel=function(){
    this.decrementRemainingJewels();
  };


  /**
   * Decrement remaining jewels by one.
   */
  this.decrementRemainingJewels=function(){
    this.remainingJewels--;
    this.setRemainingJewels(this.remainingJewels);
    if(this.remainingJewels==0){
      this.endGame=true;
    }
  };


  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.remainingJewels<=0){
      return true;
    }else{
      return false;
    }
  };



  this.setRemainingJewels(remainingJewels);
}
