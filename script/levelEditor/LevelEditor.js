function LevelEditor(){
  this.seed ='jewel-game';
  this.template='<div class="levelEditor screen display">'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  this.editor=new EditorControl();
  this.node.append(this.editor.node);

  this.options = {"playSpeed":2,"musicEnabled":false};

  this.board = new Board(this.seed,0,{"width":3,"height":3,"endCondition":{"infinite":0}},this.options);
  this.node.append(this.board.node);

  /**
   *
   */
  this.updateBoard=function(levelData){
    this.node.find('.board').data('node').killWorkers();
    this.node.find('.board').remove();
    $('.score .value').text(0);
    $('.level .value').text(0);
    $('.moves .value').text(0);
    $('.endCondition').empty();
    this.board = new Board(this.seed,0,levelData,this.options);
    this.node.append(this.board.node);
  };

}
