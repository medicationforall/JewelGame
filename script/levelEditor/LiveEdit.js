/**
 *   Jewel Game source file LiveEdit,
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
 * Live edit toggle button.
 */
function LiveEdit(){
  this.template= '<div class="control inline">'+
    '<span title="Live Edit"><svg class="Icon liveEdits" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M241.844 28.625l-21.188 5.063L33.25 78.53l-9.594 2.282 2.813 9.47 54.718 184.03 6.156 20.782 10.875-18.75 36.624-63.125 39.344 22.655 9.375-16.188-47.47-27.312L128 187.72l-4.656 8.06-30.406 52.47-45.75-153.844 156.625-37.47-30.344 52.345-4.69 8.126 8.126 4.656L332.75 211.75l-17.594 30.344 16.22 9.312 22.25-38.375 4.687-8.124-8.125-4.656-155.844-89.688 36.594-63.093 10.906-18.845zm-28.25 176.47l-57.438 99.31 155.22 89.5 8.093 4.658-4.69 8.093-44.06 76.25 218.81-52.5-63.874-215.47-44.094 76.25-4.656 8.064-8.094-4.656-155.218-89.5z" fill="" fill-opacity="1"></path></g></svg>'+
    '</span>'+
    '</div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.liveEdits=true;


  /**
   * Toggle live edits click.
   */
  this.node.find('.liveEdits').on('click',$.proxy(function(editor,event){
    if($(this).hasClass('disabled')===false){
      $(this).addClass('disabled');
      editor._setLiveEdits(false);
    }else{
      $(this).removeClass('disabled');
      editor._setLiveEdits(true);
    }
  },null,this));


  /**
   * Set live Edits
   * @private
   * @param {boolean} value
   */
  this._setLiveEdits=function(value){
    this.liveEdits=value;
  };


  /**
   * Get Live edits
   * @return {boolean}
   */
  this.getLiveEdit=function(){
    return this.liveEdits;
  };
}
