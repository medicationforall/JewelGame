function Space(color,shape){
  this.color = color;
  this.shape = shape;
  this.template = '<div class="space">'+
  '<span class="token '+shape+' '+color+'" data-color="'+color+'" data-shape="'+shape+'"></span>'+
  '<span class="highlight"></span>'+
  '<span class="outline '+shape+'"></span>'+
  '<span class="shadow '+shape+'"></span>'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  /**
   *
   */
  /*this.setColor=function(color){
    this.color = color;
  };*/

  /**
   *
   */
  this.empty=function(data){
    this.color = undefined;
    this.shape = undefined;
    this.node.find('.highlight,.token,.shadow,.outline').addClass('remove').css('display','none');
  };

  /**
   *
   */
  this.getData=function(){
    if(this.color && this.shape){
      var data = {};
      data.color = this.color;
      data.shape = this.shape;
      return data;
    }else{
      return undefined;
    }
  };


  /**
   *
   */
  this.setData=function(data){
    if(data!==undefined && data.empty!==true){
      this.node.find('.token').removeClass('remove');
      this.node.find('.highlight,.token,.shadow,.outline').css('display','');
      this.setColor(data.color);
      this.setShape(data.shape);

      if(data.drop && data.drop > 0){
        this.setDrop(data.drop);
      }
    }else{
      this.empty(data);
    }
  };


  /**
   *
   */
  this.setDrop=function(drop){
    var token = this.node.find('.highlight,.token,.shadow,.outline');
    return token.animateCss('drop'+drop);
  };


  /**
   *
   */
  this.setColor=function(color){
    if(color !== this.color){
      this.color = color;
      this.node.find('.token').attr('data-color',this.color);
      this.node.find('.token').removeClass('red blue green purple orange');
      this.node.find('.token').transitionCss(this.color);
    }
  };


  /**
   *
   */
  this.setShape=function(shape){
    if(shape !== this.shape){
      this.animateShapeChange(shape);
      this.node.find('.token').attr('data-shape',shape);
      this.node.find('.token,.shadow,.outline').removeClass('square circle triangle pentagon rabbet');

      if(shape==='circle'){
        this.shape = shape;
        this.node.find('.token,.shadow,.outline').transitionCss(this.shape);
      }else if(this.shape){
        this.shape = shape;
        this.node.find('.token,.shadow,.outline').transitionCss(this.shape);
      }else{
        this.shape = shape;
        this.node.find('.token,.shadow,.outline').addClass(this.shape);
      }
    }
  };

  /**
   *
   */
  this.animateShapeChange=function(shape){
    var fromShapes = ['square','rabbet','triangle','pentagon'];
    var token =this.node.find('.token,.shadow,.outline');

    for(var i=0,fromShape;(fromShape=fromShapes[i]);i++){
      if(fromShape !== shape && shape !== 'circle' && token.hasClass(fromShape)){
        var animationClass = fromShape+'-to-'+shape;
        token.animateCss(animationClass);
      }
    }
  };


  /**
   *
   */
  this.selectToken=function(){
    //console.log('select token');
    if(this.node.hasClass('selected')===false){
      this.node.addClass('selected');
    } else{
      this.node.removeClass('selected');
    }
  };


  /**
   *
   */
  this.unselectToken=function(){
    //console.log('select token');
    if(this.node.hasClass('selected')){
      this.node.removeClass('selected');
    }
  };
}
