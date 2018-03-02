/**
 *   Jewel Game source file Game,
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
 * Game screen.
 * @class
 */
function Game(){
  this.template='<div class="game screen display">'+
      '<div class="tip"></div>'+
    '</div>';
  this.node = $(this.template);
  this.node.data('node',this);
  this.seed = 'jewel-game';


  //Mixin
  LevelManager.call(this);
  UserOptions.call(this);
  UserGameData.call(this);
  Music.call(this);


  /**
   * Load the levels data and start the initial level.
   */
  this._constructor=function(){
    var bLevels = this.getLevelsFromJson('basic.json');
    var eLevels = this.getLevelsFromJson('random.json');

    $.when(bLevels,eLevels).done($.proxy(function(bData, eData){
      this.addLoadedLevels(bData[0].levels);
      this.addLoadedLevels(eData[0].levels);

      $('.levelSelect').data('node').setLevelSet(this.levelSet);

      this.getStoredGameData();
      this.getStoredOptions();
      this.startLevel(this.startingLevel);
      this.startMusic(this.startingLevel);
    },this)).fail(function() {
      console.log( "error" );
    });
  };


  this._constructor();
}
