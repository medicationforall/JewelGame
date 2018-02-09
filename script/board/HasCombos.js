function HasCombos(properties){
  relativePath = window.location.pathname.replace('index.html','');

  var comboWorker = new Worker(relativePath+'script/board/checkComboWorker.js');
  var dropWorker = new Worker(relativePath+'script/board/dropComboWorker.js');


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
      this.canInteract=true;

      if(this.endGame===true){
          dropWorker.terminate();
          comboWorker.terminate();
          $('.game').trigger('end-game');
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

    this.showTip({"score":newScore});
  };


  /**
   *
   */
  this.maximizeScore=function(score){};
}
