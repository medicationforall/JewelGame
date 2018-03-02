/**
 *   Jewel Game source file LevelSelect,
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
 * Level select screen.
 * @class
 */
function LevelSelect(){
  this.template='<div class="levelSelect screen"><h2>Select Level</h2></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.levels = [];

  //mixin
  Stats.call(this);

  /**
   *
   */
  this.konamiCode=function(cb) {
    var input = '';
    var key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
      input += ("" + e.keyCode);
      if (input === key) {
        return cb();
      }
      if (!key.indexOf(input)) return;
      input = ("" + e.keyCode);
    });
  };

  //register the code
  this.konamiCode($.proxy(function(){
    console.log('entered konami code - unlocking all levels.');
    this.node.find('.levelSelection').removeClass('locked');
  },this));


  /**
   * Sets the playable level set.
   * @param {Array} levelSet The set of playable levels.
   */
  this.setLevelSet=function(levelSet){
    this.levels = levelSet.levels;
    for(var i=0,level;(level = levelSet.levels[i]);i++){
      this.addLevel(i,level);
    }
  };


  /**
   * Sets the playable level set.
   * @param {Array} levelSet The set of playable levels.
   * @todo test to see if this works.
   */
  this.appendLevelSet=function(levelSet){
    var length = this.levels.length;
    for(var i=0,level;(level = levelSet.levels[i]);i++){
      this.levels.push(level);
      this.addLevel(i+length,level);
    }
  };


  /**
   * Adds a level to the list of available levels.
   */
  this.addLevel=function(index,level){
    var template = '<div class="levelSelection locked" data-level="'+index+'">'+
    '<a href="" title="Start Level '+index+'" class="selectLevel" data-level="'+index+'">'+
    'Lv <span class="number">'+(index)+'</span>: '+
    '<span class="name">'+level.name+'</span>'+
    '</a>'+
    '<div class="levelLock">'+
    '<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M254.28 17.313c-81.048 0-146.624 65.484-146.624 146.406V236h49.594v-69.094c0-53.658 43.47-97.187 97.03-97.187 53.563 0 97.032 44.744 97.032 97.186V236h49.594v-72.28c0-78.856-65.717-146.407-146.625-146.407zM85.157 254.688c-14.61 22.827-22.844 49.148-22.844 76.78 0 88.358 84.97 161.5 191.97 161.5 106.998 0 191.968-73.142 191.968-161.5 0-27.635-8.26-53.95-22.875-76.78H85.155zM254 278.625c22.34 0 40.875 17.94 40.875 40.28 0 16.756-10.6 31.23-25.125 37.376l32.72 98.126h-96.376l32.125-98.125c-14.526-6.145-24.532-20.62-24.532-37.374 0-22.338 17.972-40.28 40.312-40.28z" fill-opacity="1"></path></g></svg>'+
    '</div>'+
    '</div>';
    this.node.append(template);
  };


  /**
   * Starts the selected level if it is unlocked.
   * @todo check if level passed.
   */
  this.node.on('click','.selectLevel',$.proxy(function(levelSelect,event){
    event.preventDefault();
    if($(this).parent().hasClass('locked')===false){
      //console.log('clicked level');
      var levelNumber = parseInt($(this).data('level'));
      $('.board').data('node').killWorkers();
      var game = $('.game.screen').data('node');
      game.startLevel(levelNumber);
      game.startMusic(levelNumber);
      $('.screenControl').data('node').displayScreen('game');
    }
  },null,this));


  /**
   * Unlocks a level for selection.
   * @param {int} lv Level integer.
   */
  this.unlockLevel=function(lv){
    this.node.find('.levelSelection[data-level="'+lv+'"]').removeClass('locked');
  };


  /**
   *
   */
  this.unlockLevelsFromData=function(levelHistory){
    console.log('unlockLevelsFromData');
    var maxLevel =0;
    for(var i=0,level;(level=levelHistory[i]);i++){
      this.unlockLevel(level.level);

      if(level.level>maxLevel){
        maxLevel=level.level;
      }
    }

    if(maxLevel >0){
      maxLevel++;
      this.unlockLevel(maxLevel);
    }
  };


  /**
   * Selects a level as being played.
   * @param {int} lv Level integer.
   */
  this.selectLevel=function(lv){
    this.node.find('.levelSelection').removeClass('selected');
    this.node.find('.levelSelection[data-level="'+lv+'"]').addClass('selected');
  };
}
