/**
 *   Jewel Game source file LevelEditor,
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
 * Level editor screen.
 * @class
 */
function LevelEditor(){
  this.seed ='jewel-game';
  this.template='<div class="levelEditor screen">'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  this.editor=new EditorControl();
  this.node.append(this.editor.node);

  this.options = {"playSpeed":2,"musicEnabled":false};

  this.timer = new Timer();
  this.node.prepend(this.timer.node);

  this.board = new Board('levelEditor',this.seed,0,{
    "width":3,
    "height":3,
    "colors":['red','orange','yellow','green','blue','purple'],
    "shapes":['triangle','square','pentagon','circle','rabbet'],
    "endCondition":{"maxScore":30}
  },this.options);
  this.node.append(this.board.node);


  /**
   * Update the game board being edited.
   * @param {object} levelData
   * @todo split out resetBoard function.
   */
  this.updateBoard=function(levelData){
    if(levelData===undefined){
      levelData = this.editor.getData();
    }

    this.node.find('.board').data('node').killWorkers();
    this.node.find('.timer .timerBar').css('width','0%');
    this.node.find('.board').remove();
    $('.levelEditor.menuScreen .score .value').text(0);
    $('.levelEditor.menuScreen .level .value').text(0);
    $('.levelEditor.menuScreen .moves .value').text(0);
    $('.levelEditor.menuScreen .endCondition').empty();
    this.board = new Board('levelEditor',this.seed,0,levelData,this.options);
    this.node.append(this.board.node);

    if(levelData.timeLimit!==undefined){
      //this.node.find('.timer .timerBar').css('width','100%');
      this.timer.setTimeLimit(levelData.timeLimit);
      this.timer.startTimer();
    }else{
      this.timer.killTimer();
    }
  };


  /**
   * End game event called when a level is finished.
   */
  this.node.on('end-game',$.proxy(function(event,data){
    console.log('end Game');
    this.timer.killTimer();
    $('.endLevel').data('node').setEndLevelData(data,'levelEditor');
    $('.screenControl').data('node').displayScreen('endLevel');
  },this));
}
