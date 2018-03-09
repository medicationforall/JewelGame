function EditorControl(){
  this.template='<div class="editorControl">'+
  '<h2>Level Editor</h2>'+
  '<div>Live Edits: <input type="checkbox" name="liveEdit" checked /></div>'+
  '<div class="control">Name: <input name="levelName" style="width:100px;margin-left:3px" /></div>'+
  '<div class="control">Seed: <input name="seed" style="width:100px;margin-left:9px" /></div>'+
  '<div class="control">Width: <input name="width" type="number" min="3" value="3" style="width:50px;margin-left:5px" /></div>'+
  '<div class="control">Height: <input name="height" type="number" min="3" value="3" style="width:50px" /></div>'+

  '<div class="control"><select name="colorSelect">'+
  '<option value="red">Red</option>'+
  '<option value="orange">Orange</option>'+
  '<option value="yellow">Yellow</option>'+
  '<option vlaue="green">Green</option>'+
  '<option value="blue">Blue</option>'+
  '<option value="purple">Purple</option>'+
  '<option value="rainbow">Rainbow</option>'+
  '<option value="stone">Stone</option>'+
  '</select>'+
  '<a href="" class="addColor button">Add</a>'+
  '</div>'+

  '<div class="control colors">Colors:'+
  '<div class="colorSelection red" data-color="red"></div>'+
  '<div class="colorSelection orange" data-color="orange"></div>'+
  '<div class="colorSelection yellow" data-color="yellow"></div>'+
  '<div class="colorSelection green" data-color="green"></div>'+
  '<div class="colorSelection blue" data-color="blue"></div>'+
  '<div class="colorSelection purple" data-color="purple"></div>'+
  '<div class="colorSelection rainbow" data-color="rainbow"></div>'+
  '<div class="colorSelection stone" data-color="stone"></div>'+
  '</div>'+

  '<div class="control"><select name="shapeSelect">'+
  '<option value="triangle">Triangle</option>'+
  '<option value="square">Square</option>'+
  '<option value="pentagon">Pentagon</option>'+
  '<option vlaue="circle">Circle</option>'+
  '<option value="rabbet">Rabbet</option>'+
  '<option value="star">Star</option>'+
  '</select>'+
  '<a href="" class="addShape button">Add</a>'+
  '</div>'+
  '<div class="control shapes">Shapes:'+
  '<div class="shapeSelection triangle" data-shape="triangle"></div>'+
  '<div class="shapeSelection square" data-shape="square"></div>'+
  '<div class="shapeSelection pentagon" data-shape="pentagon"></div>'+
  '<div class="shapeSelection circle" data-shape="circle"></div>'+
  '<div class="shapeSelection rabbet" data-shape="rabbet"></div>'+
  '<div class="shapeSelection star" data-shape="star"></div>'+
  '</div>'+

  '<div class="control">'+
  'Win Condition:'+
  '<select name="winCondition">'+
  '<option value="maxScore">Max Score</option>'+
  '<option value="remainingJewels">Remaining Jewels</option>'+
  '<option value="remainingMoves">Remaining Moves</option>'+
  '</select>'+
  'Number:<input name="winValue" type="number" min="1" value="30" style="width:60px" />'+
  '</div>'+

  '<div class="control startBlocksSelect">'+
  'Start Blocks:<a href="" class="snapshot button">Snapshot</a><br />'+
  '<select name="startColor">'+
  '<option value="red">Red</option>'+
  '<option value="orange">Orange</option>'+
  '<option value="yellow">Yellow</option>'+
  '<option vlaue="green">Green</option>'+
  '<option value="blue">Blue</option>'+
  '<option value="purple">Purple</option>'+
  '<option value="rainbow">Rainbow</option>'+
  '<option value="stone">Stone</option>'+
  '</select>'+
  '<select name="startShape">'+
  '<option value="triangle">Triangle</option>'+
  '<option value="square">Square</option>'+
  '<option value="pentagon">Pentagon</option>'+
  '<option value="circle">Circle</option>'+
  '<option value="rabbet">Rabbet</option>'+
  '<option value="star">Star</option>'+
  '</select>'+
  '<a href="" class="addStartBlock button">Add</a>'+
  '</div>'+

  '<div class="control startBlocksList">'+
  '</div>'+

  '<a href="" class="restart button" title="Update and Restart the game.">Restart</a>'+
  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  this.name='';
  this.width=3;
  this.height=3;
  this.seed='';
  this.colors=['red','orange','yellow','green','blue','purple'];
  this.shapes=['triangle','square','pentagon','circle','rabbet','star'];
  this.endCondition={"maxScore":30};
  this.startBlocks=[];


  /**
   *
   */
  this.node.find('.snapshot.button').on('click',$.proxy(function(event){
    event.preventDefault();
    var board = this.node.parent().find('.board').data('node');
    var children = board.node.children();

    for(var i=0,space;(space=children[i]);i++){
      if(space.tagName==='DIV'){
        var data = $(space).data('node').getData();
        this.addStartBlock(data);
      }
    }
    console.log('clicked snapshot');
  },this));


  /**
   *
   */
  this.node.find('.addStartBlock.button').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var shape = editor.node.find('select[name="startShape"]').val();
    var color = editor.node.find('select[name="startColor"]').val();
    var data = {"shape":shape,"color":color};
    console.log('clicked add start block button',shape,color);

    editor.addStartBlock(data);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.addStartBlock=function(data){
      this.startBlocks.push(data);
      this.node.find('.startBlocksList').append('<div class="startBlock '+data.shape+' '+data.color+'" data-shape="'+data.shape+'" data-color="'+data.color+'"></div>');
  };


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
  this.node.find('select[name="winCondition"]').on('change',$.proxy(function(editor,event){
    var winCondition = $(this).val();
    var winValue = parseInt(editor.node.find('input[name="winValue"]').val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.node.find('input[name="winValue"]').on('input',$.proxy(function(editor,event){
    var winCondition = editor.node.find('select[name="winCondition"]').val();
    var winValue = parseInt($(this).val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.updateBoard();
  },null,this));


  //setup sortables
  this.node.find('.colors.control').sortable({change:$.proxy(this.changeColorOrder,this)});
  this.node.find('.shapes.control').sortable({change:$.proxy(this.changeShapeOrder,this)});
  this.node.find('.startBlocksList').sortable({update:$.proxy(function(){
    console.log('update');
    this.changeStartBlockOrder();
  },this)});

  /**
   *
   */
  this.changeStartBlockOrder=function(){
    console.log('change start block order');
    this.updateStartBlocks();
    this.updateBoard();
  };


  /**
   *
   */
  this.updateStartBlocks=function(){
    this.startBlocks=[];
    var startBlocks = this.node.find('.startBlock');

    for(var i=0,startBlock;(startBlock=startBlocks[i]);i++){
      var data = {};
      data.shape=$(startBlock).data('shape');
      data.color=$(startBlock).data('color');
      this.startBlocks.push(data);
    }
  };


  /**
   *
   */
  this.changeColorOrder=function(event,ui){
    console.log('change color order');
    this.updateColors();
    this.updateBoard();
  };


  /**
   *
   */
  this.updateShapes=function(){
      this.colors=[];
      var colors = this.node.find('.colorSelection');

      for(var i=0,color;(color=colors[i]);i++){
        this.colors.push($(color).data('color'));
      }
  };


  /**
   *
   */
  this.changeShapeOrder=function(event,ui){
    console.log('change shape order');
    this.updateShapes();
    this.updateBoard();
  };


  /**
   *
   */
  this.updateShapes=function(){
      this.shapes=[];
      var shapes = this.node.find('.shapeSelection');

      for(var i=0,shape;(shape=shapes[i]);i++){
        this.shapes.push($(shape).data('shape'));
      }
  };


  /**
   *
   */
  this.node.find('.addShape').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var value = editor.node.find('select[name="shapeSelect"]').val();
    console.log('clicked add shape',val);

    editor.addShape(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.setShapes=function(shapes){
    //reset
    this.shapes=[];
    this.node.find('.shapes.control .shapeSelection').remove();

    for(var i=0,shape;(shape=shapes[i]);i++){
      this.addShape(shape);
    }
  };


  /**
   *
   */
  this.addShape=function(shape){
    this.shapes.push(shape);
    this.node.find('.shapes.control').append('<div class="shapeSelection '+shape+'" data-shape="'+shape+'"></div>');
  };


  /**
   *
   */
  this.node.find('.addColor').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    var value = editor.node.find('select[name="colorSelect"]').val();
    console.log('clicked add color',val);

    editor.addColor(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.setColors=function(colors){
    //reset
    this.colors=[];
    this.node.find('.colors.control .colorSelection').remove();

    for(var i=0,color;(color=colors[i]);i++){
      this.addColor(color);
    }
  };


  /**
   *
   */
  this.addColor=function(color){
    this.colors.push(color);
    this.node.find('.colors.control').append('<div class="colorSelection '+color+'" data-color="'+color+'"></div>');
  };


  /**
   *
   */
  this.node.find('input[name="levelName"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    console.log('level name is is',value);
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
    console.log('seed is',value);
    editor.setSeed(value);
    editor.updateBoard();
  },null,this));


  /**
   *
   */
  this.updateBoard=function(force){
    if(force || this.node.find('input[name="liveEdit"]').is(':checked')){
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
    data.colors=this.colors;
    data.shapes=this.shapes;
    data.endCondition=this.endCondition;

    if(this.startBlocks.length>0){
      data.startBlocks=this.startBlocks;
    }

    return data;
  };


  /**
   *
   */
  this.setEndCondition=function(endCondition){
    this.endCondition=endCondition;

    for (var key in endCondition) {
      if(endCondition.hasOwnProperty(key)){
        var winCondition = key;
        var winValue = endCondition[key];

        this.node.find('select[name="winCondition"]').val(winCondition);
        this.node.find('input[name="winValue"]').val(winValue);
      }
    }
  };


  /**
   *
   */
  this.setStartBlocks=function(startBlocks){
    //reset
    this.startBlocks=[];
    for(var i,startBlock;(startBlock=startBlocks[i]);i++){
      this.addStartBlock(startBlock);
    }
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
    this.setColors(data.colors);
    this.setShapes(data.shapes);
    this.setEndCondition(data.endCondition);

    if(data.startBlocks && data.startBlocks.length>0){
      this.setStartBlocks(data.startBlocks);
    }
  };
}
