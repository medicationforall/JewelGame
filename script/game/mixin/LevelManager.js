function LevelManager(){
  this.level = 0;

  this.colors = ['red','green','blue','orange'];
  this.shapes = ['square','circle','triange','pentagon'];

  this.levelSet ={'levels':[]};

  this.timer = new Timer();
  this.node.prepend(this.timer.node);

  /**
   *
   */
  this.getLevelsFromJson=function(levelFile){
    return $.getJSON('json/'+levelFile);
  };


  /**
   *
   */
  this.addLoadedLevels=function(levels){
    this.levelSet.levels = this.levelSet.levels.concat(levels);
  };

  /**
   * Start a level determined by the given level.
   * @param {int} lv level number.
   */
  this.startLevel=function(lv){
    if(lv!==undefined){
      this.level = lv;
    }

    this.node.find('.timer .timerBar').css('width','0%');
    this.node.find('.board').remove();
    this.node.find('.tip').empty().removeClass('display');
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board=new Board(this.seed,this.level,this.levelSet.levels[this.level],this.options);
    this.node.append(this.board.node);

    if(this.levelSet.levels[this.level].timeLimit){
      //this.node.find('.timer .timerBar').css('width','100%');
      this.timer.setTimeLimit(this.levelSet.levels[this.level].timeLimit);
      this.timer.startTimer();
    }else{
      this.timer.killTimer();
    }

    //select level
    $('.levelSelect').data('node').selectLevel(this.level);

    //clear locked status
    $('.levelSelect').data('node').unlockLevel(this.level);
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
    this.startMusic(this.level);
  };


  /**
   * Restart the current level.
   */
  this.restartLevel=function(){
    if(this.timer){
      this.timer.reset();
    }
    this.startLevel(this.level);
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.timer.killTimer();
    this.setStoredGameData(data);
    $('.levelSelect').data('node').resolveStats(data);
    $('.endLevel').data('node').setEndLevelData(data,'game');
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));
}
