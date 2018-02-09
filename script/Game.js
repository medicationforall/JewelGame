function Game(){
  this.node = $('.game');
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
      console.log(data);
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
  this.node.on('end-game',$.proxy(function(){
    console.log('end Game');
    level++;

    if(level === levelSet.levels.length){
      level = 0;
    }
    this.startLevel(level);
  },this));


  /**
   * Start a level determined by the given level.
   */
  this.startLevel=function(lv){
    $('.game').empty();
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(seed,lv,levelSet.levels[lv]);
    this.node.append(this.board.node);
  };

  this._constructor();


}
