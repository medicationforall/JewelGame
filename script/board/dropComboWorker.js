var data = {};
var width = 0;
var height = 0;

/**
 * https://stackoverflow.com/a/5306832
 */
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};


/**
 *
 */
var checkDropColumns=function(grid){
  //console.log('checkComboColumns');
  var colCount = width;

  for(var colNum=0;colNum<colCount;colNum++){
    var column = [];

    //traverse the column backwards.
    for(var i=grid.length;i>0;i--){
      column.push(grid[i-1][colNum]);
    }

    var modifiedColumn = this.checkArrayDrop(column);

    if(modifiedColumn && modifiedColumn.length>0){
      for(var j=modifiedColumn.length,z=0;j>0;j--,z++){
        grid[z][colNum]=modifiedColumn[j-1];
      }
      return true;
    }
  }

  return false;
};

/**
 * @todo the column array being modified is in local memory and not working it's way back up.
 */
var checkArrayDrop=function(column){
  var emptyCount = 0;
  for(var i=0,space;(space=column[i]);i++){
    //console.log(space);
    if(space.empty){
      emptyCount++;
    }else if((space.empty===undefined || space.empty===false) && emptyCount>0){
      //console.log(space, 'move down'+emptyCount);
      space.drop=emptyCount;
      column.move(i,i-emptyCount);
      data.dropCount++;
      return column;
    }
  }
  return false;
};

/**
 *
 */
onmessage = function(e) {
  //console.log('Message received from main script',e);

  data = {};
  data.grid=e.data.grid;
  data.dropCount=0;
  data.source = e.data.source;
  width = e.data.width;
  height = e.data.height;

  var counter=0;
  while(checkDropColumns(data.grid) && counter<200 ){
    //console.log('still checking for tokens to drop',counter);
    counter++;
  }

  postMessage(data);
};
