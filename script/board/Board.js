function Board(seed,level,properties){
  this.template='<div class="board"></div>';
  this.node= $(this.template);
  this.node.data('node',this);
  this.seed= seed;
  this.rng=new Rng(this.seed);

  this.shapes=['square','circle','triangle','pentagon','rabbet','star'];
  this.colors=['red','blue','green','orange','purple', 'yellow','stone','ice','fire','rainbow'];

  var relativePath = window.location.pathname.replace('index.html','');
  //console.log('relative path',relativePath);

  var comboWorker = new Worker(relativePath+'script/board/checkComboWorker.js');
  var sleepTime = 250;
  comboWorker.onmessage = function(e) {
    if(e.data.score>0){
      if(e.data.source!=='initial'){
        this.updateScore(e.data.score);
      }
      this.updateGridPostCombo(e.data.grid);
      $.when(sleep(sleepTime)).then($.proxy(function() {
        this.dropBoard(e.data.grid,e.data.source);
      },this));
    }else{
      //console.log('can interact true');
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


  var dropWorker = new Worker(relativePath+'script/board/dropComboWorker.js');
  dropWorker.onmessage = function(e) {
    if(e.data.dropCount>0){
      this.updateGridPostCombo(e.data.grid);
    }

    $.when(sleep(sleepTime)).then($.proxy(function() {
    this.fillBoard(e.data.source);
    },this));
  }.bind(this);


  /**
   *
   */
  this._constructor=function(){
    this.setLevel(level);
    this.setEndCondition(properties.endCondition);
    this.setColors(properties.colors);
    this.setShapes(properties.shapes);
    this.buildBoardSpaces();

    //$.when(sleep(2000)).then($.proxy(function() {
      this.checkCombos('initial');
    //},this));
  };


  /**
   *
   */
  this.setColors=function(colors){
    if(colors){
        this.colors = colors;
    }
  };


  /**
   *
   */
  this.setShapes=function(shapes){
    if(shapes){
        this.shapes = shapes;
    }
  };


  /**
   *
   */
  function sleep(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms, 'foo');
    });
  }


  /**
   *
   */
  this.buildBoardSpaces=function(){
    var count = properties.width * properties.height;

    for(var i=0;i<count;i++){
      var color="red";
      var shape="square";

      var space = new Space(this._getRandomColor(),this._getRandomShape(),i);
      this.node.append(space.node);

      if((i+1)%properties.width===0){
        this.node.append('<br />');
      }
    }
  };


  /**
   *
   */
  this.checkCombos=function(source){
    //console.log('checking combos',source);
    //console.log('can interact false');
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
      var data = {};
      data.color = this._getRandomColor();
      data.shape = this._getRandomShape();
      data.drop = 5;

      space.setData(data);
      fillCount++;
      if(source!=='initial'){
        this.createdJewel();
      }
    }

    if(fillCount>0){
      this.checkCombos(source!='initial'?'fillboard':source);
    }
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
  this._getRandomColor=function(){
    return this.colors[this.rng.getRandom(this.seed+level+'-color',0,this.colors.length-1)];
  };


  /**
   *
   */
  this._getRandomShape=function(){
    return this.shapes[this.rng.getRandom(this.seed+level+'-shape',0,this.shapes.length-1)];
  };


  /**
   *
   */
  this.updateScore=function(score){
    var eScore = parseInt($('.score .value').text());
    var newScore = eScore+score;
    $('.score .value').text(newScore);
    this.maximizeScore(score);
  };

  /**
   *
   */
   this.maximizeScore=function(score){};


  /**
   *
   */
  this.setLevel=function(level){
    $('.level .value').text(level);
  };

  /**
   *
   */
  this.setEndCondition=function(endCondition){
    if(endCondition.remainingJewels){
      RemainingJewels.call(this,endCondition.remainingJewels);
    } else if(endCondition.remainingMoves){
      RemainingMoves.call(this,endCondition.remainingMoves);
    } else if(endCondition.maxScore){
      MaxScore.call(this,endCondition.maxScore);
    }else{
      console.warn('unknown end condition');
    }
  };


  /**
   *
   */
  this.node.on('click','.space',$.proxy(function(board,event){
    if(board.canInteract){
      var space = $(this).data('node');
      space.selectToken();

      var selectedSpaces = board.node.find('.space.selected');
      if(selectedSpaces.length>1){
        board.moveTokens(selectedSpaces);
      }
    }else{
      console.log('can\'t interact');
    }
  },null,this));


  /**
   *
   */
  this.moveTokens=function(spaces){
    var sp1 = $(spaces[0]).data('node');
    var sp2 = $(spaces[1]).data('node');

    if(this.isTouching(sp1,sp2)){
      this.swapTokens('moveTokens');
    }else{
      this.unselectTokens();
    }

    this.increaseMoves();
  };


  /**
   *
   */
  this.increaseMoves=function(){
    var eMoves = parseInt($('.moves .value').text());
    var newMoves = eMoves+1;
    $('.moves .value').text(newMoves);
    this.playedMove();
  };

  /**
   *
   */
  this.playedMove=function(){};


  /**
   *
   */
  this.isTouching=function(sp1,sp2){
    var i1 = sp1.getIndex();
    var i2 = sp2.getIndex();

    var xAxisCheck = i1-i2;
    var topCheck = i1 - properties.width;
    var bottomCheck = i1 + properties.width;

    if(xAxisCheck === -1 || xAxisCheck === 1){
      return true;
    }else if(topCheck === i2){
      return true;
    }else if(bottomCheck === i2){
      return true;
    }

    return false;
  };


  /**
   *
   */
  this.swapTokens=function(source){
    var selectedSpaces = this.node.find('.space.selected');
    if(selectedSpaces.length>1){
      var sp1 = $(selectedSpaces[0]).data('node');
      var sp2 = $(selectedSpaces[1]).data('node');

      data1 = sp1.getData();
      data2 = sp2.getData();

      sp1.setData(data2);
      sp2.setData(data1);

      if(source=='moveTokens'){
        $.when(sleep(sleepTime+200)).then($.proxy(function() {
          this.checkCombos('swap');
        },this));
      }
    }
  };


  /**
   *
   */
  this.unselectTokens=function(){
    var selectedSpaces = this.node.find('.space.selected');

    for(var i=0,space;(space=selectedSpaces[i]);i++){
      node = $(space).data('node');
      node.unselectToken();
    }
  };

  //main
  this._constructor();
}
