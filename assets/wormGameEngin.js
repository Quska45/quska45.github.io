var Object = function Object( id, position ){
  this.id = id;
  this.position = position;
  killWorm = false;
}

Object.prototype.moveByPosition = function remove( position ){
  this.potition = position;
}

Object.prototype.moveRight = function moveRight(){
  this.position.x++;
}

Object.prototype.moveLeft = function moveLeft(){
  this.position.x--;
}

Object.prototype.moveTop = function moveTop(){
  this.position.y++;
}

Object.prototype.moveBottom = function moveBottom(){
  this.position.y--;
}

/*
객체의 이동 방향을 나타내기 위한 enum 객체
*/
var MoveDirection = {right: "right", left: "left", top: "top", bottom: "bottom"};


/*
다차원 배열을 생성하기 위한 객체. ui가 없이 솔루션을 통해 개발된 지렁이게임을 콘솔창에서 확인하기 위해서 만든 객체이다.
*/
var DimensionalArray = function DimensionalArray(){

}

DimensionalArray.prototype.set = function(){

}

var Worm = function Worm( id, position ){
  Object.apply( this, arguments );
  this.head = false;
  this.direction = MoveDirection.right;
  this.autoMove = false;
}
Worm.prototype = Object.create( Object.prototype );
Worm.prototype.constructor = Worm;

Worm.prototype.autoMove = function autoMove(){
  
}
