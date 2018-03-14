function LevelEditor(){
  this.seed ='jewel-game';
  this.template='<div class="levelEditor screen">'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  this.editor=new EditorControl();
  this.node.append(this.editor.node);

  this.options = {"playSpeed":2,"musicEnabled":false};

  this.timer = new Timer();
  this.node.prepend(this.timer.node);

  this.board = new Board(this.seed,0,{
    "width":3,
    "height":3,
    "colors":['red','orange','yellow','green','blue','purple'],
    "shapes":['triangle','square','pentagon','circle','rabbet'],
    "endCondition":{"maxScore":30}
  },this.options);
  this.node.append(this.board.node);

  /**
   *
   */
  this.updateBoard=function(levelData){
    if(levelData===undefined){
      levelData = this.editor.getData();
    }

    this.node.find('.board').data('node').killWorkers();
    this.node.find('.timer .timerBar').css('width','0%');
    this.node.find('.board').remove();
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board = new Board(this.seed,0,levelData,this.options);
    this.node.append(this.board.node);

    if(levelData.timeLimit!==undefined){
      //this.node.find('.timer .timerBar').css('width','100%');
      this.timer.setTimeLimit(levelData.timeLimit);
      this.timer.startTimer();
    }else{
      this.timer.killTimer();
    }
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.timer.killTimer();
    $('.endLevel').data('node').setEndLevelData(data,'levelEditor');
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));

}
