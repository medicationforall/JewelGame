function Board(width,height,seed){
  this.template='<div class="board"></div>';
  this.node= $(this.template);
  this.node.data('node',this);
  this.seed=seed;
  this.rng=new Rng(this.seed);

  var shapes=['square','circle','triangle','pentagon','rabet'];
  var colors=['red','blue','green','orange','purple'];

  var comboWorker = new Worker('/script/board/checkComboWorker.js');
  comboWorker.onmessage = function(e) {
    if(e.data.score>0){
      this.updateScore(e.data.score);
      this.updateGridPostCombo(e.data.grid);
      this.dropBoard(e.data.grid);
    }
    //$('.content').text(e.data);
    //console.log('Message received from worker',e);
  }.bind(this);


  var dropWorker = new Worker('/script/board/dropComboWorker.js');
  dropWorker.onmessage = function(e) {
    if(e.data.dropCount>0){
      this.updateGridPostCombo(e.data.grid);
    }
    this.fillBoard();
    //$('.content').text(e.data);
    //console.log('Message received from worker',e);
  }.bind(this);


  /**
   *
   */
  this._constructor=function(){
    this.buildBoardSpaces();

    //$.when(sleep(2000)).then($.proxy(function() {
      this.checkCombos();
    //},this));
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
    var count = width * height;

    for(var i=0;i<count;i++){
      var color="red";
      var shape="square";

      var space = new Space(this._getRandomColor(),this._getRandomShape());
      this.node.append(space.node);

      if((i+1)%width===0){
        this.node.append('<br />');
      }
    }
  };


  /**
   *
   */
  this.checkCombos=function(){
    var gridData = this.createGridData();
    var data={};
    data.grid = gridData;
    data.width = width;
    data.height = height;

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
  this.dropBoard=function(grid){
    console.log('drop board');

    var data={};
    data.grid = grid;
    data.width = width;
    data.height = height;
    dropWorker.postMessage(data);
  };


  /**
   *
   */
  this.fillBoard=function(){
    console.log('fill board');
    var children = this.node.find('.space .token:hidden');
    var fillCount = 0;

    for(var i=0,token;(token=children[i]);i++){
      var space = $(token).parent().data('node');
      console.log('fill',space);
      var data = {};
      data.color = this._getRandomColor();
      data.shape = this._getRandomShape();
      data.insert = true;

      space.setData(data);
      fillCount++;
    }

    if(fillCount>0){
      this.checkCombos();
    }
  };


  /**
   *
   */
  this.createGridData=function(){
    var bs = this.node.children();
    var count = width * height;
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
    //console.log(grid);
    return grid;
  };


  /**
   *
   */
  this._getRandomColor=function(){
    return colors[this.rng.getRandom(this.seed+'-color',0,colors.length-1)];
  };


  /**
   *
   */
  this._getRandomShape=function(){
    return shapes[this.rng.getRandom(this.seed+'-shape',0,shapes.length-1)];
  };


  /**
   *
   */
  this.updateScore=function(score){
    var eScore = parseInt($('.score .value').text());
    var newScore = eScore+score;
    $('.score .value').text(newScore);
  };

  //main
  this._constructor();
}
