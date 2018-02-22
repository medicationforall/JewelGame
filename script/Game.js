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
  var seed = 'jewel-game';
  var level = 0;
  var startLevel = 0;
  var levelHistory = [];
  var options;

  colors = ['red','green','blue','orange'];
  shapes = ['square','circle','triange','pentagon'];

  var levelSet ={'levels':[
    {"width":5,"height":5,"endCondition":{'remainingMoves':10},'colors':colors,'shapes':shapes}
  ]};


  /**
   * Load the levels data and start the initial level.
   */
  this._constructor=function(){
    $.getJSON('json/levels.json').done($.proxy(function(data){
      levelSet = data;
      $('.levelSelect').data('node').setLevelSet(levelSet);

      this.getStoredGameData();
      this.getStoredOptions();

      this.startLevel(startLevel);
    },this)).fail(function() {
      console.log( "error" );
    });
  };


  /**
   * Gather the users cached game data.
   * If it doesn't exist intiates the user cache.
   */
  this.getStoredGameData=function(){
    var userData = store.get('userData');
    if(userData){
      startLevel = userData.currentLevel;
      levelHistory = userData.levelHistory;
      $('.levelSelect').data('node').unlockLevelsFromData(levelHistory);
      $('.levelSelect').data('node').setStatsFromData(levelHistory);
    }else{
      store.set('userData',{
        "currentLevel":startLevel,
        "levelHistory":[]
      });
    }
  };


  /**
   *
   */
  this.getStoredOptions=function(){
    options = store.get('options');
    if(options){
      $('.options.screen').data('node').setOptionsFromData(options);
    }else{
      options = {"playSpeed":1};
      store.set('options',options);
    }

    console.log('get stored options',options);
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.setStoredGameData(data);
    $('.levelSelect').data('node').resolveStats(data);
    $('.endLevel').data('node').setEndLevelData(data);
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));


  /**
   * Set the users stored data.
   */
  this.setStoredGameData=function(data){
    var currentLevel = data.level;
    currentLevel++;
    var uData = {};
    uData.currentLevel=currentLevel;
    uData.levelHistory=levelHistory;

    store.set('userData',uData);
  };


  /**
   * Starts the next level.
   */
  this.startNextLevel=function(){
    level++;

    if(level === levelSet.levels.length){
      level = 0;
    }
    this.startLevel(level);
  };


  /**
   * Restart the current level.
   */
  this.restartLevel=function(){
    this.startLevel(level);
  };


  /**
   * Start a level determined by the given level.
   * @param {int} lv level number.
   */
  this.startLevel=function(lv){
    level = lv;
    $('.game.screen').find('.board').remove();
    $('.game.screen').find('.tip').empty().removeClass('display');
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(seed,lv,levelSet.levels[lv],options);
    this.node.prepend(this.board.node);

    //select level
    $('.levelSelect').data('node').selectLevel(lv);

    //clear locked status
    $('.levelSelect').data('node').unlockLevel(lv);
  };


  /**
   * Set options.
   * @param {object} options Option data.
   */
  this.setOptions=function(tmpOptions){
    options=tmpOptions;
    store.set('options',options);
    if(this.board){
      this.board.setPlaySpeed(options.playSpeed);
    }
  };

  this._constructor();
}
