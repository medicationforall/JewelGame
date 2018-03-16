/**
 *   Jewel Game source file EndCondition,
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
 * Game end condition control.
 * @class
 */
function EndCondition(){
  this.template=  '<div class="control">'+
    'Win Condition:<br />'+
    '<select name="winCondition">'+
    '<option value="maxScore">Max Score</option>'+
    '<option value="remainingJewels">Remaining Jewels</option>'+
    '<option value="remainingMoves">Remaining Moves</option>'+
    '<option value="minScore">Min Score</option>'+
    '<option value="minMoves">Min Moves</option>'+
    '<option value="minJewels">Min Jewels</option>'+
    '</select>'+
    '<input name="winValue" type="number" min="1" value="30" style="width:50px" />'+
    '</div>';
  this.node=$(this.template);
  this.node.data('node',this);

  this.endCondition={"maxScore":30};


  /**
   * Win condition select change.
   */
  this.node.find('select[name="winCondition"]').on('change',$.proxy(function(editor,event){
    var winCondition = $(this).val();
    var winValue = parseInt(editor.node.find('input[name="winValue"]').val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Win value input change.
   */
  this.node.find('input[name="winValue"]').on('input',$.proxy(function(editor,event){
    var winCondition = editor.node.find('select[name="winCondition"]').val();
    var winValue = parseInt($(this).val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   * Set the level end condition.
   * @param {object} endCondition {"maxScore",30}
   */
  this.setEndCondition=function(endCondition){
    this.endCondition=endCondition;

    for (var key in endCondition) {
      if(endCondition.hasOwnProperty(key)){
        var winCondition = key;
        var winValue = endCondition[key];

        this.node.find('select[name="winCondition"]').val(winCondition);
        this.node.find('input[name="winValue"]').val(winValue);
      }
    }
  };


  /**
   * Get the level end condition data.
   * @return {object} Example: {"maxScore",30}
   */
  this.getEndCondition=function(){
    return this.endCondition;
  };
}
