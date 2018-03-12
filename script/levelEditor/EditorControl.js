function EditorControl(){
  this.template='<div class="editorControl">'+
  '<h2>Level Editor</h2>'+
  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  this.liveEdit = new LiveEdit();
  this.node.append(this.liveEdit.node);

  this.nameControl = new NameControl();
  this.node.append(this.nameControl.node);

  this.seedControl = new SeedControl();
  this.node.append(this.seedControl.node);

  this.widthControl = new WidthControl();
  this.node.append(this.widthControl.node);

  this.heightControl = new HeightControl();
  this.node.append(this.heightControl.node);

  this.colorSelector = new ColorSelector();
  this.node.append(this.colorSelector.node);

  this.shapeSelector = new ShapeSelector();
  this.node.append(this.shapeSelector.node);

  this.startBlocks = new StartBlocks();
  this.node.append(this.startBlocks.node);

  this.timerControl = new TimerControl();
  this.node.append(this.timerControl.node);

  this.endCondition=new EndCondition();
  this.node.append(this.endCondition.node);

  //reset button
  this.node.append('<a href="" class="restart button" title="Update and Restart the game.">Apply</a>');


  /**
   *
   */
  this.node.find('.restart.button').on('click',$.proxy(function(event){
    event.preventDefault();
    console.log('restart board');
    this.updateBoard(true);
  },this));


  /**
   *
   */
  this.updateBoard=function(force){
    if(force || this.liveEdit.getLiveEdit()){
      this.node.parent().data('node').updateBoard(this.getData());
    }
  };


  /**
   *
   */
  this.getData=function(){
    var data={};
    data.name=this.nameControl.getName();

    if(this.seedControl.getSeed()!==''){
      data.seed=this.seedControl.getSeed();
    }

    data.width=this.widthControl.getWidth();
    data.height=this.heightControl.getHeight();
    data.colors=this.colorSelector.getColors();
    data.shapes=this.shapeSelector.getShapes();

    if(this.timerControl.getTimeLimit()!==undefined){
      data.timeLimit = this.timerControl.getTimeLimit();
    }
    
    data.endCondition=this.endCondition.getEndCondition();

    var startBlocks = this.startBlocks.getStartBlocks();

    if(startBlocks.length>0){
      data.startBlocks=startBlocks;
    }

    return data;
  };


  /**
   *
   */
  this.setData=function(data){
    this.nameControl.setName(data.name);

    if(data.seed && data.seed!==''){
      this.seedControl.setSeed(data.seed);
    }else{
      this.seedControl.setSeed('');
    }

    this.widthControl.setWidth(data.width);
    this.heightControl.setHeight(data.height);
    this.colorSelector.setColors(data.colors);
    this.shapeSelector.setShapes(data.shapes);

    if(data.timeLimit !==undefined){
      this.timerControl.setTimeLimit(true,data.timeLimit);
    }

    this.endCondition.setEndCondition(data.endCondition);

    if(data.startBlocks && data.startBlocks.length>0){
      this.startBlocks.setStartBlocks(data.startBlocks);
    }
  };
}
