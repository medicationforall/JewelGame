function Space(color,shape){
  this.color = color;
  this.shape = shape;
  this.template = '<div class="space">'+
  '<span class="token '+shape+' '+color+'" data-color="'+color+'" data-shape="'+shape+'"></span>'+
  '<span class="outline '+shape+'"></span>'+
  '<span class="shadow '+shape+'"></span>'+
  '</div>';

  this.node=$(this.template);
  this.node.data('node',this);

  /**
   *
   */
  this.setColor=function(color){
    this.color = color;
  };

  /**
   *
   */
  this.empty=function(){
    this.node.find('.token,.shadow,.outline').css('display','none');
    this.color = undefined;
    this.shape = undefined;

    //console.log('empty space',this.node.data('node'));
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
      var animations = [];
      this.node.find('.token,.shadow,.outline').css('display','');
      animations.push(this.setColor(data.color));
      animations.push(this.setShape(data.shape));
      return animations;
    }else{
      this.empty();
    }
  };


  /**
   *
   */
  this.setColor=function(color){
    if(color !== this.color){
      this.color = color;
      this.node.find('.token').attr('data-color',this.color);
      this.node.find('.token').removeClass('red blue green purple orange');
      return this.node.find('.token').transitionCss(this.color);
    }
  };


  /**
   *
   */
  this.setShape=function(shape){
    if(shape !== this.shape){
      var animation = this.animateShapeChange(shape);
      this.node.find('.token').attr('data-shape',shape);
      this.node.find('.token,.shadow,.outline').removeClass('square circle triangle pentagon rabbet');

      if(shape==='circle'){
        this.shape = shape;
        animation = this.node.find('.token,.shadow,.outline').transitionCss(this.shape);
      }else if(this.shape){
        this.shape = shape;
        animation = this.node.find('.token,.shadow,.outline').transitionCss(this.shape);
      }else{
        this.shape = shape;
        this.node.find('.token,.shadow,.outline').addClass(this.shape);
      }
      return animation;
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
        return token.animateCss(animationClass);
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
