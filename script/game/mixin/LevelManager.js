/**
 *   Jewel Game source file LevelManager,
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
function LevelManager(){
  this.level = 0;

  this.colors = ['red','green','blue','orange'];
  this.shapes = ['square','circle','triange','pentagon'];

  this.levelSet ={'levels':[]};

  this.timer = new Timer();
  this.node.prepend(this.timer.node);

  /**
   *
   */
  this.getLevelsFromJson=function(levelFile){
    return $.getJSON('json/'+levelFile);
  };


  /**
   *
   */
  this.addLoadedLevels=function(levels){
    this.levelSet.levels = this.levelSet.levels.concat(levels);
  };


  /**
   *
   */
  this.addLevel=function(level){
    this.levelSet.levels.push(level);
  };


  /**
   * Start a level determined by the given level.
   * @param {int} lv level number.
   */
  this.startLevel=function(lv){
    if(lv!==undefined){
      this.level = lv;
    }

    this.node.find('.timer .timerBar').css('width','0%');
    this.node.find('.board').remove();
    this.node.find('.tip').empty().removeClass('display');
    $('.game.menuScreen .score .value').text(0);
    $('.game.menuScreen .level .value').text(0);
    $('.game.menuScreen .moves .value').text(0);
    $('.game.menuScreen .endCondition').empty();
    this.board=new Board('game',this.seed,this.level,this.levelSet.levels[this.level],this.options);
    this.node.append(this.board.node);

    if(this.levelSet.levels[this.level].timeLimit){
      //this.node.find('.timer .timerBar').css('width','100%');
      this.timer.setTimeLimit(this.levelSet.levels[this.level].timeLimit);
      this.timer.startTimer();
    }else{
      this.timer.killTimer();
    }

    //select level
    $('.levelSelect').data('node').selectLevel(this.level);

    //clear locked status
    $('.levelSelect').data('node').unlockLevel(this.level);
  };


  /**
   * Starts the next level.
   */
  this.startNextLevel=function(){
    this.level++;

    if(this.level === this.levelSet.levels.length){
      this.level = 0;
    }
    this.startLevel(this.level);
    this.startMusic(this.level);
  };


  /**
   * Restart the current level.
   */
  this.restartLevel=function(){
    if(this.timer){
      this.timer.reset();
    }
    this.startLevel(this.level);
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.timer.killTimer();
    this.setStoredGameData(data);
    $('.levelSelect').data('node').resolveStats(data);
    $('.endLevel').data('node').setEndLevelData(data,'game');
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));
}
