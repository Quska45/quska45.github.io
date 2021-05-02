// 6. 먹이 클래스
WormGameEngine.Food = function Food( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.isEdible = true;
}
WormGameEngine.Food.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Food.prototype.constructor = WormGameEngine.Food;
