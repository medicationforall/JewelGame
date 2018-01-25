function Space(color,shape){
  this.color = color;
  this.shape = shape;
  this.template = '<div class="space">'+
  '<span class="token '+shape+' '+color+'" data-color="'+color+'" data-shape="'+shape+'"></span>'+
  '<span class="shadow '+shape+' '+color+'"></span>'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  /**
   *
   */
  this.setColor=function(color){
    this.color = color;
  };

  this.empty=function(){
    this.node.empty();
  };
}
