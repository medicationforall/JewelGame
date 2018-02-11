function Board(seed,level,properties){
  var template='<div class="board"></div>';
  this.node= $(template);
  this.node.data('node',this);

  this.seed= seed;
  this.rng=new Rng(this.seed);
  this.startBlockIndex = 0;
  this.tipIndex=0;

  this.shapes=['square','circle','triangle','pentagon','rabbet','star'];
  this.colors=['red','blue','green','orange','purple', 'yellow','stone','ice','fire','rainbow'];

  this.sleepTime = 250;


  HasCombos.call(this,properties);
  HasMoveTokens.call(this,properties);


  /**
   *
   */
  this._constructor=function(){
    this.setLevel(level);
    this.setEndCondition(properties.endCondition);
    this.setColors(properties.colors);
    this.setShapes(properties.shapes);

    this.buildBoardSpaces();
    this.showTip({"score":0});
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

      var space = this.buildBoardSpace(i);
      //var space = new Space(this._getRandomColor(),this._getRandomShape(),i);
      this.node.append(space.node);

      if((i+1)%properties.width===0){
        this.node.append('<br />');
      }
    }
  };


  /**
   *
   */
  this.buildBoardSpace=function(index){
    var space = null;
    if(properties.startBlocks && properties.startBlocks[index]){
      var data = properties.startBlocks[index];
      space = new Space(data.color,data.shape,index);
      this.startBlockIndex++;
    }else{
      space = new Space(this._getRandomColor(),this._getRandomShape(),index);
    }
    return space;
  };

/**
 *
 */
  this.showTip=function(prop){
    if(properties.tips){
        if(properties.tips[this.tipIndex]){
          var message = properties.tips[this.tipIndex].message;
          var score = properties.tips[this.tipIndex].score;

          if(prop && prop.score === score){
            $('.tip').addClass('display').html(message).animateCss('vanishIn');
            this.tipIndex++;
          }else{
            $('.tip').removeClass('display');
          }
        }else{
          $('.tip').removeClass('display');
        }
    }
  };


  /**
   *
   */
  this.sleep=function(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms, 'foo');
    });
  };


  /**
   *
   */
  this._getRandomColor=function(){
    return this.colors[this.rng.getRandom(this.seed+properties.name+'-color',0,this.colors.length-1)];
  };


  /**
   *
   */
  this._getRandomShape=function(){
    return this.shapes[this.rng.getRandom(this.seed+properties.name+'-shape',0,this.shapes.length-1)];
  };


  /**
   *
   */
  this.getEndGameData=function(){
    var data = {"level":"merf"};
    data.level = level;
    data.levelName = properties.name;
    data.score = parseInt($('.score .value').text());
    data.moves = parseInt($('.moves .value').text());
    return data;
  };


  //main
  this._constructor();
}
