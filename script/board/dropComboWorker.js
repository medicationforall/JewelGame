/**
 *   Jewel Game source file dropComboWorker,
 *   Copyright (C) 2018  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
 *
 */
var checkArrayDrop=function(column){
  var emptyCount = 0;
  for(var i=0,space;(space=column[i]);i++){

    if( i===0 &&space.color==='stone'){
      space.empty=true;
      space.fallOff=true;
    }

    if(space.empty){
      emptyCount++;
    }else if((space.empty===undefined || space.empty===false) && emptyCount>0){
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
  data = {};
  data.grid=e.data.grid;
  data.dropCount=0;
  data.source = e.data.source;
  width = e.data.width;
  height = e.data.height;

  var counter=0;
  while(checkDropColumns(data.grid) && counter<200 ){
    counter++;
  }
  postMessage(data);
};
