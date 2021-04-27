// 5. 지렁이 클래스
WormGameEngine.Worm = function Worm( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.head = false;
  this.direction = WormGameEngine.MoveDirection.right;
  this.autoMove = false;
  this.isKillObj = true;
}
WormGameEngine.Worm.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Worm.prototype.constructor = WormGameEngine.Worm;

WormGameEngine.Worm.prototype.autoMove = function autoMove(){
  //direction 자체에 뭔가 기능이 있으면 좋을 듯
  this[ "move" + this.direction ]();
  return this;
}

WormGameEngine.Worm.prototype.eatFood = function eatFood( wbObject ){
  if(wbObject.isEdible){
    return
  }
}