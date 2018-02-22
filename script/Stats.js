/**
 *   Jewel Game source file Stats,
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
 * Options screen.
 * @mixin
 */
function Stats(){
  this.lvData = [];


  /**
   * Set stats from cached user data.
   * @param {array} levelHistory all of the users play data.
   */
  this.setStatsFromData=function(levelHistory){
    for(var i=0,level;(level=levelHistory[i]);i++){
      this.resolveStats(level);
    }
  };


  /**
   * Process the given level data
   * @public
   * @param {object} level Level data.
   */
  this.resolveStats=function(level){
    if(this.lvData[level.level]===undefined){
      this._addStats(level);
    }else{
      this._appendStats(level);
    }
  };


  /**
   * Add stats to a level that didn't have stats yet.
   * @private
   * @param {object} data Level data.
   *
   */
  this._addStats=function(data){
    var tData = Object.assign({}, data);
    tData.plays=1;
    this.lvData[data.level] = tData;

    this._addStatsNode(tData);
  };


  /**
   * Create the stats node.
   * @private
   * @param {object} data Level data.
   */
  this._addStatsNode=function(data){
    var template = '<div class="levelStat" data-level="'+data.level+'">'+
    '<span class="plays">Played '+data.plays+' '+(data.plays>1?'times':'time')+'</span><br /><br />'+
    'Best:<br />'+
    'Score: <span class="statScore">'+data.score+'</span><br />'+
    'Moves: <span class="statMoves">'+data.moves+'</span><br />'+
    '</div>';
    this.node.find('.levelSelection[data-level="'+data.level+'"]').append(template);
  };


  /**
   * Append stats to a level that already has stats.
   * @private
   * @param {object} data Level data.
   */
  this._appendStats=function(data){
    var tData = Object.assign({}, data);
    tData.plays = this.lvData[data.level].plays+1;
    var rating = tData.score/tData.moves;
    //cached rating
    var cRating = this.lvData[data.level].score/this.lvData[data.level].moves;

    if(rating > cRating){
      this.lvData[data.level] = tData;
    }else{
      this.lvData[data.level].plays++;
    }

    this.updateStatsNode(this.lvData[data.level]);
  };


  /**
   * Update an existing stats node.
   * @private
   * @param {object} data Level data.
   */
  this.updateStatsNode=function(data){
    this.node.find('.levelStat[data-level="'+data.level+'"] .plays').text('Played '+data.plays+' '+(data.plays>1?'times':'time'));
    this.node.find('.levelStat[data-level="'+data.level+'"] .statScore').text(data.score);
    this.node.find('.levelStat[data-level="'+data.level+'"] .statMoves').text(data.moves);
  };
}
