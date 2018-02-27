function LevelManager(){
  this.level = 0;

  this.colors = ['red','green','blue','orange'];
  this.shapes = ['square','circle','triange','pentagon'];

  this.levelSet ={'levels':[]};

  /**
   *
   */
  this.getLevelsFromJson=function(levelFile){
    return $.getJSON('json/'+levelFile);
  };

  this.addLoadedLevels=function(levels){
    this.levelSet.levels = this.levelSet.levels.concat(levels);
  };

  /**
   * Start a level determined by the given level.
   * @param {int} lv level number.
   */
  this.startLevel=function(lv){
    this.level = lv;
    $('.game.screen').find('.board').remove();
    $('.game.screen').find('.tip').empty().removeClass('display');
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(this.seed,lv,this.levelSet.levels[lv],this.options);
    this.node.prepend(this.board.node);

    //select level
    $('.levelSelect').data('node').selectLevel(lv);

    //clear locked status
    $('.levelSelect').data('node').unlockLevel(lv);
  };


  /**
   * Starts the next level.
   */
  this.startNextLevel=function(){
    this.level++;

    if(this.level === this.levelSet.levels.length){
      this.level = 0;
    }
    this.startLevel(this.level);
  };


  /**
   * Restart the current level.
   */
  this.restartLevel=function(){
    this.startLevel(this.level);
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.setStoredGameData(data);
    $('.levelSelect').data('node').resolveStats(data);
    $('.endLevel').data('node').setEndLevelData(data);
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));
}
