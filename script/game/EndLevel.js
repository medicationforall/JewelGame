/**
 *   Jewel Game source file EndLevel,
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
 * End Level screen.
 * @class
 */
function EndLevel(data){
  this.template='<div class="endLevel screen">'+
    '<h2>Level <span class="endLevel"></span> Complete!</h2>'+
    '<div class="content">'+
    'Jewels Removed: <span class="endJewelsCleared"></span><br />'+
    'Moves: <span class="endMoves"></span><br />'+
    'Score: <span class="endScore"></span><br />'+
    '<!--Total Points: <span class="totalPoints"></span>-->'+
    '</div>'+
    '<a href="" class="nextLevelLink">Continue</a>'+
  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  var continueSound = new Howl({
    src: ['sound/continue.wav']
  });


  /**
   *
   */
  this.setEndLevelData=function(data){
    this.node.find('.endLevel').text(data.level);
    this.node.find('.endLevelName').text(data.levelName);
    this.node.find('.endScore').text(data.score);
    this.node.find('.endMoves').text(data.moves);
    this.node.find('.endJewelsCleared').text(data.jewelsCleared);
    //this.node.find('.totalPoints').text((data.score-data.moves));
  };


  /**
   *
   */
  this.node.on('click','.nextLevelLink',$.proxy(function(event){
    event.preventDefault();
    $('.game.screen').data('node').startNextLevel();
    $('.screenControl').data('node').displayScreen('game');
    continueSound.play();
  },this));
}
