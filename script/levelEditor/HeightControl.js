function HeightControl(){
  this.template='<div class="control">Height: <input name="height" type="number" min="3" value="3" style="width:50px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.height=3;


  /**
   *
   */
  this.node.find('input[name="height"]').on('input',$.proxy(function(editor){
    var value = parseInt($(this).val());
    console.log('height is',value);
    editor.setHeight(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setHeight=function(height){
    this.height=height;
    this.node.find('input[name="height"]').val(height);
  };


  /**
   *
   */
  this.getHeight=function(){
    return this.height;
  };

}
