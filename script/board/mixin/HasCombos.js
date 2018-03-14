/**
 *   Jewel Game source file HasCombo,
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
 * HasCombos mixin for board.
 * @param {object} properties level properties.
 * @see ../Board.js
 * @mixin
 */
function HasCombos(properties){
  relativePath = window.location.pathname.replace('index.html','');

  var comboWorker = new Worker(relativePath+'script/board/checkComboWorker.js');
  var dropWorker = new Worker(relativePath+'script/board/dropComboWorker.js');
  this.jewelsCleared=0;

  comboSounds = [];
  comboSounds.push(new Howl({src: ['sound/combo.wav']}));
  comboSounds.push(new Howl({src: ['sound/combo3.wav']}));
  comboSounds.push(new Howl({src: ['sound/combo2.wav']}));
  comboSounds.push(new Howl({src: ['sound/combo4.wav']}));
  comboSounds.push(new Howl({src: ['sound/combo5.wav']}));

  var introSound = new Howl({
    src: ['sound/intro2.wav']
  });


  /**
   * Onmessage response for comboWorker.
   * @param {object} e onMessage response.
   */
  comboWorker.onmessage = function(e) {
    if(e.data.score>0){
      if(e.data.source!=='initial'){
        this.updateScore(e.data.score);
        $('.timer').data('node').increaseTime(e.data.score);
      }
      this.updateGridPostCombo(e.data.grid);
      $.when(this.sleep(this.sleepTime)).then($.proxy(function() {
        this.dropBoard(e.data.grid,e.data.source);
      },this));
    }else{
      if(e.data.source==='initial'){
        introSound.play();
      }
      this.canInteract=true;

      if(this.endGame===true){
        this.endBoard();
      }
    }

    if(e.data.source==='swap'){
      if(e.data.score===0){
        this.swapTokens('checkCombos');
      }
      this.unselectTokens();
    }
  }.bind(this);


  /**
   * Destroy the web workers.
   */
  this.killWorkers=function(){
    dropWorker.terminate();
    comboWorker.terminate();
  };


  /**
   * Onmessage response for dropWorker.
   * @param {object} e onMessage response.
   */
  dropWorker.onmessage = function(e) {
    if(e.data.dropCount>0){
      this.updateGridPostCombo(e.data.grid);
    }

    $.when(this.sleep(this.sleepTime+600)).then($.proxy(function() {
    this.fillBoard(e.data.source);
    },this));
  }.bind(this);


  /**
   * Check for combos from the current board state.
   * @param {string} source name of the checkCombos request initiator.
   */
  this.checkCombos=function(source){
    this.canInteract=false;
    var gridData = this.createGridData();
    var data={};
    data.grid = gridData;
    data.width = properties.width;
    data.height = properties.height;
    data.source = source;

    comboWorker.postMessage(data);
  };


  /**
   * Update the grid after checking for combos
   * @param {array} gridData state of the boards cells.
   */
  this.updateGridPostCombo=function(gridData){
    var bs = this.node.children();
    var gridCount=0;
    var tmpGridData = [].concat.apply([], gridData);

    for(var i=0,space;(space=bs[i]);i++){
      if(space.tagName==='DIV'){
        var node = $(space).data('node');
        node.setData(tmpGridData[gridCount]);
        gridCount++;
      }
    }
  };


  /**
   * Kicks off the dropWorker to check for tokens that can be dropped.
   * @param {array,array} grid current state of the board as an array.
   * @param {string} source of the dropBoard request.
   */
  this.dropBoard=function(grid,source){
    var data={};
    data.grid = grid;
    data.width = properties.width;
    data.height = properties.height;
    data.source = source;
    dropWorker.postMessage(data);
  };


  /**
   * Fill empty board spaces.
   * @param {string} source of the fillBoard request.
   */
  this.fillBoard=function(source){
    var children = this.node.find('.space .token.remove');
    var fillCount = 0;

    for(var i=0,token;(token=children[i]);i++){
      var space = $(token).parent().data('node');
      var data = this.fillBoardSpaceData();
      space.setData(data);
      fillCount++;
      if(source!=='initial'){
        this.createdJewel();
        this.jewels++;
        this.jewelsCleared++;
        this.checkLevelBlocks();
      }
    }

    if(fillCount>0){
      $.when(this.sleep(this.sleepTime+600)).then($.proxy(function() {
        this.checkCombos(source!='initial'?'fillboard':source);
      },this));
    }
  };


  /**
   * Collect the data to fill a board.
   */
  this.fillBoardSpaceData=function(){
    var data = {};
    if(this.startBlocks && this.startBlockIndex < this.startBlocks.length){
      data.color = this.startBlocks[this.startBlockIndex].color;
      data.shape = this.startBlocks[this.startBlockIndex].shape;
      this.startBlockIndex++;
    }else{
      data.color = this._getRandomColor();
      data.shape = this._getRandomShape();
    }
    data.drop = 5;

    return data;
  };


  /**
   * Called when a jewel is created.
   * Intended to be overriden.
   */
  this.createdJewel=function(){};


  /**
   * Collect a snapshot of the board as an array
   * @return {array,array}
   */
  this.createGridData=function(){
    var bs = this.node.children();
    var count = properties.width * properties.height;
    var grid = [];
    var row = [];
    for(var i=0,space;(space=bs[i]);i++){
      if(space.tagName==='DIV'){
        var node = $(space).data('node');
        row.push(node.getData());
      }else if(space.tagName==='BR'){
        grid.push(row);
        row=[];
      }
    }
    return grid;
  };


  /**
   * Increase the score.
   * @param {int} score to increase by.
   */
  this.updateScore=function(score){
    var eScore = this.score;
    var newScore = eScore+score;
    $('.'+this.screen+'.menuScreen .score .value').text(newScore);
    this.score = newScore;
    this.maximizeScore(score);
    this.checkLevelBlocks();

    if(this.tipType==='score'){
      this.showTip({"score":newScore});
    }

    comboSound = comboSounds.shift();
    comboSound.play();
    comboSounds.push(comboSound);
  };


  /**
   * Called when score is increased.
   * Intended to be overriden.
   */
  this.maximizeScore=function(score){};
}
