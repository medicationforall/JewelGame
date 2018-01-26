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
      this.color = data.color;
      this.shape = data.shape;

      //this.node.replaceWith(this.template);

      this.node.find('.token').attr('data-color',this.color);
      this.node.find('.token').attr('data-shape',this.shape);

      this.node.find('.token').removeClass('red blue green purple orange').addClass(this.color);
      this.node.find('.token,.shadow,.outline').removeClass('square circle triangle pentagon rabet').addClass(this.shape);
      this.node.find('.token,.shadow,.outline').css('display','');
    }else{
      this.empty();
    }
  };


  /**
   *
   */
  this.selectToken=function(){
    console.log('select token');
    if(this.node.hasClass('selected')===false){
      this.node.addClass('selected');
    } else{
      this.node.removeClass('selected');
    }
  };
}
