/**
 *   Jewel Game source file MaxScore,
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
 * Sets a win condition for the board of maxScore.
 * @mixin
 * @param {int} maxScore
 */
function MaxScore(maxScore){
  var endConditionTemplate = 'Target Score:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);
  this.tmpScore=0;
  this.maxScore=0;


  /**
   * Set max score.
   * @param {int} maxScore
   */
  this.setMaxScore=function(maxScore){
    this.maxScore=maxScore;
    this.endCondition.find('.value').text(maxScore);
  };


  /**
   * Called when score is increased.
   * @param {int} score Amount to increase by.
   */
  this.maximizeScore=function(score){
    this.tmpScore+=score;
    if(this.tmpScore>=maxScore){
      this.endGame=true;
    }
  };


  /**
   * Has the win condition been satisfied?
   * @return {boolean}
   */
  this.isWin=function(){
    if(this.tmpScore>=maxScore){
      return true;
    }else{
      return false;
    }
  };

  this.setMaxScore(maxScore);
}
