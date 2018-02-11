function Game(){
  this.template='<div class="game screen display">'+
      '<div class="tip"></div>'+
    '</div>';
  this.node = $(this.template);
  this.node.data('node',this);
  var seed = 'jewel-game';
  var level = 0;

  colors = ['red','green','blue','orange'];
  shapes = ['square','circle','triange','pentagon'];

  var levelSet ={'levels':[
    {"width":5,"height":5,"endCondition":{'remainingMoves':10},'colors':colors,'shapes':shapes}
  ]};


  /**
   * Load the levels data and start the initial level.
   */
  this._constructor=function(){
    $.getJSON('json/levels.json').done($.proxy(function(data){
      levelSet = data;
      $('.levelSelect').data('node').setLevelSet(levelSet);
      this.startLevel(0);
    },this)).fail(function() {
      console.log( "error" );
    });
  };


  /**
   *
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    $('.endLevel').data('node').setEndLevelData(data);
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));


  /**
   *
   */
  this.startNextLevel=function(){
    level++;

    if(level === levelSet.levels.length){
      level = 0;
    }
    this.startLevel(level);
  };


  /**
   * Start a level determined by the given level.
   */
  this.startLevel=function(lv){
    $('.game.screen').find('.board').remove();
    $('.game.screen').find('.tip').empty().removeClass('display');
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(seed,lv,levelSet.levels[lv]);
    this.node.prepend(this.board.node);

    //clear locked status
    $('.levelSelect').data('node').unlockLevel(lv);
  };

  this._constructor();
}
