/**
 *   Jewel Game source file UserOptions,
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
 * Storing and loading user options from the browser cache.
 * @mixin
 */
function UserOptions(){
  this.options=undefined;

  /**
   * Get stored user options.
   */
  this.getStoredOptions=function(){
    this.options = store.get('options');
    if(this.options){
      this.setOptions(this.options);
      $('.options.screen').data('node').setOptionsFromData(this.options);
    }else{
      this.options = {"playSpeed":2.0,"musicEnabled":true,"musicVolume":100};
      store.set('options',this.options);
    }
  };


  /**
   * Set options.
   * @param {object} tmpOptions Option data.
   */
  this.setOptions=function(tmpOptions){
    this.options=tmpOptions;
    store.set('options',this.options);
    if(this.board){
      this.board.setPlaySpeed(this.options.playSpeed);
    }

    this.setMusicEnabled(this.options.musicEnabled);
    this.setMusicVolume(this.options.musicVolume);
  };
}
