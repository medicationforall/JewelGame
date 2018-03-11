function EditorControl(){
  this.template='<div class="editorControl">'+
  '<h2>Level Editor</h2>'+
  '<div>'+
  '<svg class="Icon liveEdits" title="Live Edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M241.844 28.625l-21.188 5.063L33.25 78.53l-9.594 2.282 2.813 9.47 54.718 184.03 6.156 20.782 10.875-18.75 36.624-63.125 39.344 22.655 9.375-16.188-47.47-27.312L128 187.72l-4.656 8.06-30.406 52.47-45.75-153.844 156.625-37.47-30.344 52.345-4.69 8.126 8.126 4.656L332.75 211.75l-17.594 30.344 16.22 9.312 22.25-38.375 4.687-8.124-8.125-4.656-155.844-89.688 36.594-63.093 10.906-18.845zm-28.25 176.47l-57.438 99.31 155.22 89.5 8.093 4.658-4.69 8.093-44.06 76.25 218.81-52.5-63.874-215.47-44.094 76.25-4.656 8.064-8.094-4.656-155.218-89.5z" fill="" fill-opacity="1"></path></g></svg>'+
  '</div>'+
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
  '</div>'+

  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  this.liveEdits=true;
  this.name='';
  this.width=3;
  this.height=3;
  this.seed='';
  this.colors=['red','orange','yellow','green','blue','purple'];
  this.shapes=['triangle','square','pentagon','circle','rabbet','star'];

  this.endCondition=new EndCondition();
  this.node.append(this.endCondition.node);

  this.startBlocks = new StartBlocks();
  this.node.append(this.startBlocks.node);

  //reset button
  this.node.append('<a href="" class="restart button" title="Update and Restart the game.">Apply</a>');


  /**
   *
   */
  this.node.find('.liveEdits').on('click',$.proxy(function(editor,event){
    if($(this).hasClass('disabled')===false){
      $(this).addClass('disabled');
      editor.setLiveEdits(false);
    }else{
      $(this).removeClass('disabled');
      editor.setLiveEdits(true);
    }
  },null,this));

  /**
   *
   */
  this.setLiveEdits=function(value){
    this.liveEdits=value;
  };

  /**
   *
   */
  this.node.find('.restart.button').on('click',$.proxy(function(event){
    event.preventDefault();
    console.log('restart board');
    this.updateBoard(true);
  },this));


  //setup sortables
  this.node.find('.colors.control').sortable({change:$.proxy(this.changeColorOrder,this)});
  this.node.find('.shapes.control').sortable({change:$.proxy(this.changeShapeOrder,this)});


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
    if(force || this.liveEdits){
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
    this.setColors(data.colors);
    this.setShapes(data.shapes);
    this.endCondition.setEndCondition(data.endCondition);

    if(data.startBlocks && data.startBlocks.length>0){
      this.startBlocks.setStartBlocks(data.startBlocks);
    }
  };
}
