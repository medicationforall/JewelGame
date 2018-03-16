/**
 *   Jewel Game source file EditorControl,
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
 
/**
 * EditorControl form contains all of level editing controls.
 * @class
 */
function EditorControl(){
  this.template='<div class="editorControl">'+
  '<h2>Level Editor</h2>'+
  '</div>';

  this.node = $(this.template);
  this.node.data('node',this);

  this.liveEdit = new LiveEdit();
  this.node.append(this.liveEdit.node);

  this.downloadControl = new DownloadControl();
  this.node.append(this.downloadControl.node);

  this.uploadControl = new UploadControl();
  this.node.append(this.uploadControl.node);

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
  this.node.append('<a href="" class="restart button" title="Update and Restart the game.">Apply</a><br />');

  //add level button
  this.node.append('<a href="" class="addLevel button" title="Add Level.">Add Level</a>');


  /**
   * Add Level click.
   */
  this.node.find('.addLevel.button').on('click',$.proxy(function(editor,event){
    event.preventDefault();
    console.log('add level button');
    editor.addLevel();
  },null,this));


  /**
   * Add a level.
   */
  this.addLevel=function(){
    console.log('add level');
    var data = this.getData();
    var game = $('.game.screen').data('node');
    var levelSelect = $('.levelSelect.screen').data('node');
    game.addUserLevel(data);
    game.addLevel(data);
    levelSelect.addCustomLevel(data);
  };


  /**
   * Restart the board click.
   */
  this.node.find('.restart.button').on('click',$.proxy(function(event){
    event.preventDefault();
    console.log('restart board');
    this.updateBoard(true);
  },this));


  /**
   * Update the player game board.
   */
  this.updateBoard=function(force){
    if(force || this.liveEdit.getLiveEdit()){
      this.node.parent().data('node').updateBoard(this.getData());
    }
  };


  /**
   * Get the level data
   * @return {object} The level data.
   * Example output:
   * {
   *   "name": "Stone 8x8",
   *   "seed": "8x8",
   *   "width": 8,
   *   "height": 8,
   *   "colors": ["red", "green", "blue", "orange", "purple","yellow","stone"],
   *   "shapes": ["square", "circle", "pentagon", "rabbet","star"],
   *   "endCondition": {
   *     "maxScore": 50
   *   }
   * }
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
   * Set the level data.
   * @param {object} data
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
