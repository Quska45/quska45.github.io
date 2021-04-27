// 1. 객체 공통 클래스
WormGameEngine.WgObject = function WgObject( id, position ){
  this.id = id;
  this.position = position;
  isKillObj = false;
  isEdible = false;
}

WormGameEngine.WgObject.prototype.moveByPosition = function moveByPosition( position ){
  this.potition = position;
  return this;
}

WormGameEngine.WgObject.prototype.moveright = function moveRight(){
  this.position.x++;
  return this;
}

WormGameEngine.WgObject.prototype.moveleft = function moveLeft(){
  this.position.x--;
  return this;
}

WormGameEngine.WgObject.prototype.movetop = function moveTop(){
  this.position.y++;
  return this;
}

WormGameEngine.WgObject.prototype.movebottom = function moveBottom(){
  this.position.y--;
  return this;
}
