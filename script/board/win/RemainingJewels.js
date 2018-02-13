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
function RemainingJewels(remainingJewels){
  var endConditionTemplate = 'Remaining Jewels:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);


  /**
   *
   */
  this.setRemainingJewels=function(remainingJewels){
    this.remainingJewels=remainingJewels;
    this.endCondition.find('.value').text(remainingJewels);
  };


  /**
   *
   */
  this.createdJewel=function(){
    console.log('created Jewel');
    this.decrementRemainingJewels();
  };


  /**
   *
   */
  this.decrementRemainingJewels=function(){
    this.remainingJewels--;
    this.setRemainingJewels(this.remainingJewels);
    if(this.remainingJewels==0){
      this.endGame=true;
    }
  };


  this.setRemainingJewels(remainingJewels);
}
