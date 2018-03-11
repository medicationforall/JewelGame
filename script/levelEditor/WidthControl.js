function WidthControl(){
  this.template= '<div class="control">Width: <input name="width" type="number" min="3" value="3" style="width:50px;margin-left:5px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.width=3;


  /**
   *
   */
  this.node.find('input[name="width"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('width is',value);
    editor.setWidth(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setWidth=function(width){
    this.width=width;
    this.node.find('input[name="width"]').val(width);
  };


  /**
   *
   */
  this.getWidth=function(){
    return this.width;
  };

}
