/**
 *   Jewel Game source file RemainingMoves,
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

function RemainingMoves(remainingMoves){
  var endConditionTemplate = 'Remaining Moves:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);


  /**
   *
   */
  this.setRemainingMoves=function(remainingMoves){
    this.remainingMoves=remainingMoves;
    this.endCondition.find('.value').text(remainingMoves);
  };


  /**
   *
   */
  this.playedMove=function(){
    console.log('created Jewel');
    this.decrementRemainingMoves();
  };


  /**
   *
   */
  this.decrementRemainingMoves=function(){
    this.remainingMoves--;
    this.setRemainingMoves(this.remainingMoves);
    if(this.remainingMoves==0){
      this.endGame=true;
    }
  };

  this.setRemainingMoves(remainingMoves);
}
