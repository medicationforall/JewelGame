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
function MaxScore(maxScore){
  var endConditionTemplate = 'Target Score:<span class="value">0</span>';
  this.endCondition = $('.endCondition').append(endConditionTemplate);
  this.tmpScore=0;


  /**
   *
   */
  this.setMaxScore=function(maxScore){
    this.maxScore=maxScore;
    this.endCondition.find('.value').text(maxScore);
  };


  /**
   *
   */
  this.maximizeScore=function(score){
    console.log('maximizeScore');
    this.tmpScore+=score;
    if(this.tmpScore>=maxScore){
      this.endGame=true;
    }
  };


  this.setMaxScore(maxScore);
}
