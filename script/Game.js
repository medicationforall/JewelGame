function Game(){
  this.node = $('.game');
  this.node.data('node',this);

  this.board=new Board(10,9,'jewel-game');
  this.node.append(this.board.node);
}
