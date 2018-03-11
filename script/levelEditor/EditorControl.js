function EditorControl(){
  this.template='<div class="editorControl">'+
  '<h2>Level Editor</h2>'+
  '<div class="control">Name: <input name="levelName" style="width:100px;margin-left:3px" /></div>'+
  '<div class="control">Seed: <input name="seed" style="width:100px;margin-left:9px" /></div>'+
  '<div class="control">Width: <input name="width" type="number" min="3" value="3" style="width:50px;margin-left:5px" /></div>'+
  '<div class="control">Height: <input name="height" type="number" min="3" value="3" style="width:50px" /></div>'+

  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  this.name='';
  this.width=3;
  this.height=3;
  this.seed='';

  this.liveEdit = new LiveEdit();
  this.node.prepend(this.liveEdit.node);

  this.colorSelector = new ColorSelector();
  this.node.append(this.colorSelector.node);

  this.shapeSelector = new ShapeSelector();
  this.node.append(this.shapeSelector.node);

  this.startBlocks = new StartBlocks();
  this.node.append(this.startBlocks.node);

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
  this.node.find('input[name="levelName"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    //console.log('level name is is',value);
    editor.setName(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.setName=function(name){
    this.name=name;
    this.node.find('input[name="name"]').val(name);
  };


  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    //console.log('seed is',value);
    editor.setSeed(value);
    editor.updateBoard();
  },null,this));


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
  this.setSeed=function(seed){
    this.seed=seed;
    this.node.find('input[name="seed"]').val(seed);
  };


  /**
   *
   */
  this.node.find('input[name="width"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('width is',value);
    editor.setWidth(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.setWidth=function(width){
    this.width=width;
    this.node.find('input[name="width"]').val(width);
  };


  /**
   *
   */
  this.node.find('input[name="height"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('height is',value);
    editor.setHeight(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.setHeight=function(height){
    this.height=height;
    this.node.find('input[name="height"]').val(height);
  };


  /**
   *
   */
  this.getData=function(){
    var data={};
    data.name=this.name;

    if(this.seed!==''){
      data.seed=this.seed;
    }

    data.width=this.width;
    data.height=this.height;
    data.colors=this.colorSelector.getColors();
    data.shapes=this.shapeSelector.getShapes();
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
    this.name=data.name;

    if(data.seed && data.seed!==''){
      this.setSeed(data.seed);
    }else{
      this.setSeed('');
    }

    this.setWidth(data.width);
    this.setHeight(data.height);
    this.colorSelector.setColors(data.colors);
    this.shapeSelector.setShapes(data.shapes);
    this.endCondition.setEndCondition(data.endCondition);

    if(data.startBlocks && data.startBlocks.length>0){
      this.startBlocks.setStartBlocks(data.startBlocks);
    }
  };
}
