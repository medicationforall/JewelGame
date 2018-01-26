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
    this.updateGridPostCombo(e.data.grid);
    //$('.content').text(e.data);
    console.log('Message received from worker',e);
  }.bind(this);

  /**
   *
   */
  this._constructor=function(){
    this.buildBoardSpaces();

    $.when(sleep(2000)).then($.proxy(function() {
      this.checkCombos2();
    },this));


    /*$.when(sleep(1000)).then($.proxy(function() {
      var counter = 0;
        while(this.checkCombos2()){
          this.fillBoard();

          console.log('ran checkCombos',counter);
          counter++;
        }
    },this));*/
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
  /*this.checkCombos=function(){
    //console.log('check combos');
    var children = this.node.children();
    var grid = this.createGrid(children);

    if(this.checkComboRows(grid) || this.checkComboColumns(grid)){
      return true;
    }

    return false;
  };*/

  /**
   *
   */
  this.checkCombos2=function(){
    var children = this.node.children();
    var gridData = this.createGridData(children);
    var data={};
    data.grid = gridData;
    data.width = width;
    data.height = height;

    comboWorker.postMessage(data);
  };


  /**
   *
   */
  /*this.checkComboRows=function(grid){
    //console.log('checkComboRows');
    for(var i=0;i<grid.length;i++){
      if(this.checkArrayCombo(grid[i])){
        return true;
      }
    }

    return false;
  };*/


  /**
   *
   */
  /*this.checkComboColumns=function(grid){
    //console.log('checkComboColumns');
    var colCount = width;

    for(var colNum=0;colNum<colCount;colNum++){
      var column = [];

      for(var i=0;i<grid.length;i++){
        column.push(grid[i][colNum]);
      }

      if(this.checkArrayCombo(column)){
        return true;
      }
    }

    return false;
  };*/

  /**
   *
   */
  /*this.checkArrayCombo=function(ar){
    return this.checkArrayComboColor(ar) || this.checkArrayComboShape(ar);
  };*/


  /**
   *
   */
  /*this.checkArrayComboColor=function(ar){
    var color = '';
    var match=[];

    for(var i=0,space;(space=ar[i]);i++){
      var tColor = $(space).find('.token').data('color');

        if($(space).hasClass('empty')){
          if(match.length>2){
            console.log('match hit shape');
            this.scoreCombo(match);
            return true;
          }

          color = '';
          match=[];
        } else if(color!=tColor){
        if(match.length>2){
          console.log('match hit color');
          this.scoreCombo(match);
          return true;
        }
        color=tColor;
        match=[];
        match.push(space);
      }else if(color===tColor){
        match.push(space);
      }
    }

    //final check
    if(match.length>2){
      console.log('match hit color');
      this.scoreCombo(match);
      return true;
    }

    return false;
  };*/


  /**
   *
   */
  /*this.checkArrayComboShape=function(ar){
    var shape = '';
    var match=[];

    for(var i=0,space;(space=ar[i]);i++){
      var tShape = $(space).find('.token').data('shape');
      if($(space).hasClass('empty')){
        if(match.length>2){
          console.log('match hit shape');
          this.scoreCombo(match);
          return true;
        }

        color = '';
        match=[];
      } else if(shape!=tShape){

        if(match.length>2){
          console.log('match hit shape');
          this.scoreCombo(match);
          return true;
        }

        shape=tShape;
        match=[];
        match.push(space);
      }else if(shape===tShape){
        match.push(space);
      }
    }

    //final check
    if(match.length>2){
      console.log('match hit shape');
      this.scoreCombo(match);
      return true;
    }

    return false;
  };*/


  /**
   *
   */
  /*this.scoreCombo=function(match){
    var addScore = 1+(match.length%3);
    console.log('increase score by',addScore);

    for(var i=0,space;(space=match[i]);i++){
        var node = $(space).data('node');
        node.empty();
        node.node.addClass('empty');
    }
  };*/


  /**
   *
   */
  /*this.createGrid=function(bs){
    var count = width * height;
    var grid = [];
    var row = [];
    for(var i=0,space;(space=bs[i]);i++){
      if(space.tagName==='DIV'){
        row.push(space);
      }else if(space.tagName==='BR'){
        grid.push(row);
        row=[];
      }
    }

    //console.log(grid);

    return grid;
  };*/


  /**
   *
   */
  this.createGridData=function(bs){
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
  this.fillBoard=function(){
    console.log('fill board');
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

  //main
  this._constructor();
}
