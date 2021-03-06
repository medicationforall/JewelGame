/**
 *   Jewel Game source file UploadControl,
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
 * Upload icon and file input.
 * @class
 */
function UploadControl(){
  this.template='<div class="control inline">'+
  '<span class="Upload" title="Upload Level Data">'+
  '<svg class="Icon upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;">'+
  '<path d="M64 48c-8.726 0-16 7.274-16 16v384c0 8.726 7.274 16 16 16h215v-16H64V64h63.375v97.53c0 3.924 3.443 7.095 7.72 7.095h169.81c4.277 0 7.72-3.17 7.72-7.094V64h69.22c.428.318.8.548 1.467 1.094 2.05 1.675 4.962 4.264 8.375 7.406 6.827 6.283 15.65 '+
  '14.837 24.313 23.5 8.663 8.663 17.217 17.486 23.5 24.313 3.142 3.413 5.73 6.324 7.406 8.374.546.668.776 1.04 1.094 1.47V330.25l16 16V128c0-2.68-.657-3.402-1.03-4.156-.375-.754-.725-1.294-1.095-1.844-.74-1.1-1.575-2.19-2.594-3.438-2.036-2.492-4.768-5.55-8.03-9.093-6.524-7.09-15.155-16-23.938-24.782-8.782-8.783-17.692-17.414-24.78-23.938-3.545-3.262-6.6-5.994-9.094-8.03-1.247-1.02-2.337-1.855-3.438-2.595-.55-.37-1.09-.72-1.844-1.094-.754-.373-1.477-1.03-4.156-1.03H64zm87.72 16h48.56c4.277 0 7.72 4.425 7.72 9.938v70.124c0 5.513-3.443 9.938-7.72 9.938h-48.56c-4.277 0-7.72-4.425-7.72-9.938V73.938c0-5.512 3.443-9.937 7.72-9.937zM114 212c-4.432 0-8 3.568-8 8v184c0 4.432 3.568 8 8 8h165v-28h-76.72l15.345-15.375 128-128L352 234.28l6.375 6.345L406 288.25V220c0-4.432-3.568-8-8-8H114zm238 47.75L245.75 366H297v128h110V366h51.25L352 259.75zM448 384v64h-23v16h23c8.726 0 16-7.274 16-16v-64h-16z" fill="" fill-opacity="1"></path></g></svg>'+
  '</span>'+
  '<input type="file" name="file" class="importFile" title="Upload JSON File" accept=".json" style="width: 90px" />'+
  '</div>';
  this.node=$(this.template);
  this.node.data('node',this);


  /**
   * Import file selector change.
   */
  this.node.find('input[name="file"]').change($.proxy(function(editor,event){
    event.preventDefault();

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var file = this.files[0];
      var reader = new FileReader();

      reader.onload = $.proxy(function(e) {
        var text = reader.result;
        var data = jQuery.parseJSON(text);

        editor.uploadLevelEditorData(data);
      },this);
      reader.readAsText(file);
    } else {
      alert('The File APIs are not fully supported by your browser.');
    }
  },null,this));


  /**
   * Apply the uploaded level data.
   * @param {object}
   */
  this.uploadLevelEditorData=function(data){
    console.log('upload level editor data');
    var editorControl = this.node.closest('.editorControl').data('node');
    editorControl.setData(data);
    editorControl.updateBoard(true);
  };
}
