function Board(seed,level,properties){
  this.HasCombos(this);
  this.HasMoveTokens(this);
  
  var template='<div class="board"></div>';
  this.node= $(template);
  this.node.data('node',this);
  
  this.seed= seed;
  this.rng=new Rng(this.seed);

  this.shapes=['square','circle','triangle','pentagon','rabbet','star'];
  this.colors=['red','blue','green','orange','purple', 'yellow','stone','ice','fire','rainbow'];

  
  var sleepTime = 250;
  
  
  /**
   *
   */
  this._constructor=function(){
    this.setLevel(level);
    this.setEndCondition(properties.endCondition);
    this.setColors(properties.colors);
    this.setShapes(properties.shapes);
    
    this.buildBoardSpaces();
    this.checkCombos('initial');
  };
  
  
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
  function sleep(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms, 'foo');
    });
  }


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


  //main
  this._constructor();
}
