/**
 *   Jewel Game source file UserLevels,
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
 * Store and load user created levels from the browser cache.
 * @mixin
 */
function UserLevels(){
  this.userLevels=[];


  /**
   * Add a user created level.
   * @param {object} level data.
   */
  this.addUserLevel=function(level){
    this.userLevels.push(level);
    this.storeUserLevels();
  };


  /**
   * Push the user created levels to the browser cache.
   */
  this.storeUserLevels=function(){
    store.set('userLevels',this.userLevels);
  };


  /**
   * Get the user created levels from the browser cache.
   * @return {array} Array of user levels.
   */
  this.getUserLevels=function(){
    var tmpLevels = store.get('userLevels');

    if(tmpLevels){
      this.userLevels = tmpLevels;
    }

    return this.userLevels;
  };
}
