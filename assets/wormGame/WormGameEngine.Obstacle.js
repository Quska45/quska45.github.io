// 7. 장애물 클래스
WormGameEngine.Obstacle = function Obstacle( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.isKillObj = true;
}
WormGameEngine.Obstacle.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Obstacle.prototype.constructor = WormGameEngine.Obstacle;
