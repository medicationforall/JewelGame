function NameControl(){
  this.template='<div class="control">Name: <input name="levelName" style="width:100px;margin-left:3px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.name='';


  /**
   *
   */
  this.node.find('input[name="levelName"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    //console.log('level name is is',value);
    editor.setName(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setName=function(name){
    this.name=name;
    this.node.find('input[name="name"]').val(name);
  };


  /**
   *
   */
  this.getName=function(){
    return this.name;
  };


}
