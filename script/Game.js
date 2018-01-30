function Game(){
  this.node = $('.game');
  this.node.data('node',this);
  var seed = 'jewel-game';
  var level = 0;
  var levels = [
    {"width":10,"height":9,"endCondition":{'remainingJewels':300}},
    {"width":5,"height":5,"endCondition":{'remainingMoves':10}},
    {"width":6,"height":6,"endCondition":{'maxScore':20}},
    {"width":9,"height":9,"endCondition":{'unknown':20}},
  ];


  this.node.on('end-game',$.proxy(function(){
    console.log('end Game');
    level++;

    if(level === levels.length){
      level = 0;
    }
    this.startNextLevel();
  },this));

  this.startNextLevel=function(){
    $('.game').empty();
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(seed,level+1,levels[level]);
    this.node.append(this.board.node);
  };

  this.startNextLevel();


}
