/**
 *   Jewel Game source file MinMoves,
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
function MinMoves(minMoves){
  var endConditionTemplate = 'Minimum Moves:<span class="value">0</span>';
  this.endCondition = $('.'+this.screen+'.menuScreen .endCondition').append(endConditionTemplate);
  this.tmpMoves=0;
  this.minMoves=0;


  /**
   * Set remaining moves.
   * @param {int} remainingMoves
   */
  this.setMinMoves=function(minMoves){
    this.minMoves=minMoves;
    this.endCondition.find('.value').text(minMoves);
  };


  /**
   * Called when a move is played.
   */
  this.playedMove=function(){
    this.incrementMinMoves();
  };


  /**
   * Decrement remaining moves by one.
   */
  this.incrementMinMoves=function(){
    this.tmpMoves++;
  };

  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpMoves>=this.minMoves){
      return true;
    }else{
      return false;
    }
  };

  this.setMinMoves(minMoves);
}
