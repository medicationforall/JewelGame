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
  //this.template='<div class="game screen display">'+
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
    var rLevels = this.getLevelsFromJson('rainbow.json');
    var sLevels = this.getLevelsFromJson('stone.json');
    var eLevels = this.getLevelsFromJson('random.json');
    var tLevels = this.getLevelsFromJson('timed.json');

    $.when(bLevels,rLevels,sLevels,eLevels,tLevels).done($.proxy(this._resolvedLevels,this)).fail(function(){
      console.log( "Failed to load level data - error" );
    });
  };


  /**
   * Handle loaded levels.
   * @private
   */
  this._resolvedLevels=function(bData, rData, sData, eData,tData){
    this.addLoadedLevels(bData[0].levels);
    this.addLoadedLevels(rData[0].levels);
    this.addLoadedLevels(sData[0].levels);
    this.addLoadedLevels(eData[0].levels);
    this.addLoadedLevels(tData[0].levels);

    $('.levelSelect').data('node').setLevelSet(this.levelSet);

    this.getStoredGameData();
    this.getStoredOptions();
    this.startLevel(this.startingLevel);
    this.startMusic(this.startingLevel);
  };


  //Main
  this._constructor();
}
