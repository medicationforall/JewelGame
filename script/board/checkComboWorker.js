/**
 *   Jewel Game source file checkComboWorker,
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
        this.scoreCombo(match,type,'colorHit');
        return true;
      }

      color = '';
      match=[];
    } else if(color!=space.color){
      if(match.length>2){
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
        this.scoreCombo(match,type,'shapeHit');
        return true;
      }

      shape = '';
      match=[];
    } else if(shape!=space.shape){

      if(match.length>2){
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
  data.score+=addScore;

  for(var i=0,space;(space=match[i]);i++){
      space.empty=true;
      space[rc]=true;
      space[sc]=true;
  }
};


/**
 *
 */
onmessage = function(e) {
  data = {};
  data.score=0;
  data.grid=e.data.grid;
  data.source=e.data.source;
  width = e.data.width;
  height = e.data.height;

  var counter=0;
  while(checkCombos(data.grid) && counter<200 ){
    counter++;
  }
  postMessage(data);
};
