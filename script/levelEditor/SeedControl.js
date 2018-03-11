function SeedControl(){
  this.template='<div class="control">Seed: <input name="seed" style="width:100px;margin-left:9px" /></div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.seed='';


  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(editor){
    var value = $(this).val();
    //console.log('seed is',value);
    editor.setSeed(value);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setSeed=function(seed){
    this.seed=seed;
    this.node.find('input[name="seed"]').val(seed);
  };


  /**
   *
   */
  this.getSeed=function(){
    return this.seed;
  };

}
