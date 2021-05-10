// 5. 지렁이 클래스
WormGameEngine.Worm = function Worm( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.head = false;
  this.direction = WormGameEngine.MoveDirection.right;
  this.isAutoMove = false;
  this.isKillObj = true;
}
WormGameEngine.Worm.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Worm.prototype.constructor = WormGameEngine.Worm;

WormGameEngine.Worm.prototype.autoMove = function autoMove(){
  this.direction.moveNextPosition( this );
  return this;
}

WormGameEngine.Worm.prototype.eatFood = function eatFood( wbObject ){
  if( wbObject.isEdible ){
    return true;
  } else {
    return false;
  }
}