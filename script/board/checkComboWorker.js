var data = {};
var width = 0;
var height = 0;


/**
 *
 */
var checkCombos=function(grid){
  if(checkComboRows(grid) || checkComboColumns(grid)){
    return true;
  }

  return false;
};


/**
 *
 */
var checkComboRows=function(grid){
  //console.log('checkComboRows');
  for(var i=0;i<grid.length;i++){
    if(this.checkArrayCombo(grid[i],'rowHit')){
      return true;
    }
  }

  return false;
};


/**
 *
 */
var checkComboColumns=function(grid){
  //console.log('checkComboColumns');
  var colCount = width;

  for(var colNum=0;colNum<colCount;colNum++){
    var column = [];

    for(var i=0;i<grid.length;i++){
      column.push(grid[i][colNum]);
    }

    if(this.checkArrayCombo(column,'columnHit')){
      return true;
    }
  }

  return false;
};


/**
 *
 */
var checkArrayCombo=function(ar,type){
  return checkArrayComboColor(ar,type) || checkArrayComboShape(ar,type);
};

/**
 *
 */
var checkArrayComboColor=function(ar,type){
  var color = '';
  var match=[];

  for(var i=0,space;(space=ar[i]);i++){

    if(space===undefined || (space.empty && space[type]) ){
      if(match.length>2){
        //console.log('match hit shape');
        this.scoreCombo(match,type,'colorHit');
        return true;
      }

      color = '';
      match=[];
    } else if(color!=space.color){
      if(match.length>2){
        //console.log('match hit color');
        this.scoreCombo(match,type,'colorHit');
        return true;
      }

      color=space.color;
      match=[];
      match.push(space);
    }else if(color===space.color){
      match.push(space);
    }
  }

  //final check
  if(match.length>2){
    //console.log('match hit color');
    this.scoreCombo(match,type,'colorHit');
    return true;
  }

  return false;
};


/**
 *
 */
var checkArrayComboShape=function(ar,type){
  var shape = '';
  var match=[];

  for(var i=0,space;(space=ar[i]);i++){
    if(space===undefined || (space.empty && space[type])){
      if(match.length>2){
        //console.log('match hit');
        this.scoreCombo(match,type,'shapeHit');
        return true;
      }

      shape = '';
      match=[];
    } else if(shape!=space.shape){

      if(match.length>2){
        //console.log('match hit shape');
        this.scoreCombo(match,type,'shapeHit');
        return true;
      }

      shape=space.shape;
      match=[];
      match.push(space);
    }else if(shape===space.shape){
      match.push(space);
    }
  }

  //final check
  if(match.length>2){
    //console.log('match hit shape');
    this.scoreCombo(match,type,'shapeHit');
    return true;
  }

  return false;
};


/**
 *
 */
this.scoreCombo=function(match,rc,sc){
  var addScore = match.length-2;
  //console.log('increase score by',addScore);
  data.score+=addScore;

  for(var i=0,space;(space=match[i]);i++){
      //var node = $(space).data('node');
      //node.empty();
      //node.node.addClass('empty');
      space.empty=true;
      space[rc]=true;
      space[sc]=true;
  }
};


/**
 *
 */
onmessage = function(e) {
  //console.log('Message received from main script',e);

  data = {};
  data.score=0;
  data.grid=e.data.grid;
  width = e.data.width;
  height = e.data.height;

  var counter=0;
  while(checkCombos(data.grid) && counter<200 ){
    //console.log('still checking for combos',counter);
    counter++;
  }

  postMessage(data);
};
