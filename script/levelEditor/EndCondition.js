function EndCondition(){
  this.template=  '<div class="control">'+
    'Win Condition:<br />'+
    '<select name="winCondition">'+
    '<option value="maxScore">Max Score</option>'+
    '<option value="remainingJewels">Remaining Jewels</option>'+
    '<option value="remainingMoves">Remaining Moves</option>'+
    '<option value="minScore">Min Score</option>'+
    '<option value="minMoves">Min Moves</option>'+
    '<option value="minJewels">Min Jewels</option>'+
    '</select>'+
    '<input name="winValue" type="number" min="1" value="30" style="width:50px" />'+
    '</div>';
  this.node=$(this.template);
  this.node.data('node',this);

  this.endCondition={"maxScore":30};

  /**
   *
   */
  this.node.find('select[name="winCondition"]').on('change',$.proxy(function(editor,event){
    var winCondition = $(this).val();
    var winValue = parseInt(editor.node.find('input[name="winValue"]').val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.node.find('input[name="winValue"]').on('input',$.proxy(function(editor,event){
    var winCondition = editor.node.find('select[name="winCondition"]').val();
    var winValue = parseInt($(this).val());
    var endCondition = {};
    endCondition[winCondition]=winValue;
    editor.setEndCondition(endCondition);
    editor.node.parent().data('node').updateBoard();
  },null,this));


  /**
   *
   */
  this.setEndCondition=function(endCondition){
    this.endCondition=endCondition;

    for (var key in endCondition) {
      if(endCondition.hasOwnProperty(key)){
        var winCondition = key;
        var winValue = endCondition[key];

        this.node.find('select[name="winCondition"]').val(winCondition);
        this.node.find('input[name="winValue"]').val(winValue);
      }
    }
  };


  /**
   *
   */
  this.getEndCondition=function(){
    return this.endCondition;
  };
}
