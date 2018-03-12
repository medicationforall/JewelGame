function TimerControl(){
  this.template='<div class="control">'+
  '<svg class="Icon timerIcon disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;">'+
  '<path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0"></path><g class="" transform="translate(0,0)" style="touch-action: none;">'+
  '<path d="M179.594 20.688v41.406h143.25V20.687h-143.25zM256.03 82C143.04 82 51.25 173.727 51.25 286.656c0 112.93 91.788 204.656 204.78 204.656 112.994 0 204.75-91.728 204.75-204.656C460.78 173.73'+
  ' 369.025 82 256.03 82zm0 35.625c93.42 0 169.126 75.665 169.126 169.03 0 93.368-75.706 169.564-169.125 169.564-93.417 0-169.155-76.197-169.155-169.564 0-93.366 75.736-169.03 169.156-169.03zm76.19 '+
  '20.28l-72.47 107.5c10.67 1.036 20.516 6.045 27.625 13.814l44.844-121.314zm-85.533 1.064v45.31c3.077-.275 6.196-.405 9.344-.405 3.155 0 6.263.13 9.345.406v-45.31h-18.688zm-88.53 36.655l-13.22 13.22L177 '+
  '220.874c3.992-4.784 8.432-9.198 13.22-13.188l-32.064-32.062zm195.75 0l-32.063 32.063c4.786 3.99 9.196 8.403 13.187 13.187l32.064-32.03-13.188-13.22zm-98.344 81.22c-2.08.01-4.195.243-6.313.686-16.948 3.544-27.7 20.005-24.156 36.94 3.544 16.932 20.02 27.698 36.97 24.155 16.946-3.543 27.7-20.004 24.155-36.938-3.102-14.816-16.104-24.925-30.658-24.843zM108.28 277.31V296h45.314c-.278-3.08-.406-6.192-.406-9.344 0-3.146.13-6.27.406-9.344H108.28zm250.157 0c.277 3.075.438 6.197.438 9.344 0 3.153-.16 6.264-.438 9.344h45.344v-18.688H358.44zm-60.062 6.72c.993 10.522-1.968 20.742-7.813 28.937l124 19.092-116.187-48.03zM176.97 352.405l-32.032 32.03 13.218 13.22 32.063-32.03c-4.798-4-9.253-8.424-13.25-13.22zm158.093 0c-4 4.796-8.423 9.22-13.22 13.22l32.063 32.03 13.188-13.22-32.03-32.03zM246.688 389v45.313h18.687V389c-3.082.278-6.19.438-9.344.438-3.147 0-6.266-.16-9.342-.438z" fill="" fill-opacity="1"></path></g></svg>'+
  '<input name="timerValue" type="number" style="width:60px" disabled value="60" min="1" />'+
  '</div>';
  this.node=$(this.template);
  this.node.data('node',this);
  this.timerEnabled=false;
  this.timerValue=60;


  /**
   *
   */
  this.node.find('.timerIcon').on('click',$.proxy(function(editor,event){
    var enable = $(this).hasClass('disabled');
    var timerValue = parseInt(editor.node.find('input[name="timerValue"]').val());
    editor.setTimeLimit(enable,timerValue);
    editor.node.parent().data('node').updateBoard();
  },null,this));



  /**
   *
   */
  this.node.find('input[name="timerValue"]').on('input',$.proxy(function(editor,event){
    var timerValue = parseInt(editor.node.find('input[name="timerValue"]').val());
    editor.setTimeLimit(editor.timerEnabled,timerValue);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setTimeLimit=function(enable,value){
    this.timerEnabled=enable;
    this.timerValue=value;
    if(enable){
      this.node.find('.timerIcon').removeClass('disabled');
      this.node.find('input[name="timerValue"]').prop("disabled", false);
    }else{
      this.node.find('.timerIcon').addClass('disabled');
      this.node.find('input[name="timerValue"]').prop("disabled", true);
    }
    this.node.find('input[name="timerValue"]').val(value);
  };


  /**
   *
   */
  this.getTimeLimit=function(){
    if(this.timerEnabled){
      return this.timerValue;
    }else{
      return undefined;
    }
  };

}
