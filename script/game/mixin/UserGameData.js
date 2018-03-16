/**
 *   Jewel Game source file UserGameData,
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
function UserGameData(){
  this.startingLevel = 0;
  this.levelHistory = [];


  /**
   * Gather the users cached game data.
   * If it doesn't exist intiates the user cache.
   */
  this.getStoredGameData=function(){
    var userData = store.get('userData');
    if(userData){
      this.startingLevel = userData.currentLevel;
      this.levelHistory = userData.levelHistory;
      $('.levelSelect').data('node').unlockLevelsFromData(this.levelHistory);
      $('.levelSelect').data('node').setStatsFromData(this.levelHistory);
    }else{
      store.set('userData',{
        "currentLevel":this.startingLevel,
        "levelHistory":[]
      });
    }
  };


  /**
   * Set the users stored data.
   */
  this.setStoredGameData=function(data){
    var currentLevel = data.level;
    if(data.win){
      currentLevel++;

      if(currentLevel === this.levelSet.levels.length){
        currentLevel = 0;
      }
    }
    var uData = {};
    uData.currentLevel=currentLevel;
    this.levelHistory.push(data);
    uData.levelHistory=this.levelHistory;

    store.set('userData',uData);
  };
}
