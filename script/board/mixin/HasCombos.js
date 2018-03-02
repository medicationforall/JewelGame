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

  var endSound = new Howl({
    src: ['sound/levelComplete.wav']
  });


  /**
   *
   */
  comboWorker.onmessage = function(e) {
    if(e.data.score>0){
      if(e.data.source!=='initial'){
        this.updateScore(e.data.score);
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
          this.killWorkers();
          $('.game').trigger('end-game',this.getEndGameData());
          endSound.play();
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
   *
   */
  this.killWorkers=function(){
    dropWorker.terminate();
    comboWorker.terminate();
  };


  /**
   *
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
   *
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
   *
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
   *
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
   *
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
        this.jewelsCleared++;
      }
    }

    if(fillCount>0){
      $.when(this.sleep(this.sleepTime+600)).then($.proxy(function() {
        this.checkCombos(source!='initial'?'fillboard':source);
      },this));
    }
  };


  /**
   *
   */
  this.fillBoardSpaceData=function(){
    var data = {};
    if(properties.startBlocks && this.startBlockIndex < properties.startBlocks.length){
      data.color = properties.startBlocks[this.startBlockIndex].color;
      data.shape = properties.startBlocks[this.startBlockIndex].shape;
      this.startBlockIndex++;
    }else{
      data.color = this._getRandomColor();
      data.shape = this._getRandomShape();
    }
    data.drop = 5;

    return data;
  };


  /**
   *
   */
  this.createdJewel=function(){};


  /**
   *
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
   *
   */
  this.updateScore=function(score){
    var eScore = parseInt($('.score .value').text());
    var newScore = eScore+score;
    $('.score .value').text(newScore);
    this.maximizeScore(score);

    if(this.tipType==='score'){
      this.showTip({"score":newScore});
    }

    comboSound = comboSounds.shift();
    comboSound.play();
    comboSounds.push(comboSound);
  };


  /**
   *
   */
  this.maximizeScore=function(score){};
}
