var wgObject = function wgObject( id, position ){
  this.id = id;
  this.position = position;
  killWorm = false;
  type = WgObjType.wgObject;
}

wgObject.prototype.moveByPosition = function remove( position ){
  this.potition = position;
  return this;
}

wgObject.prototype.moveright = function moveRight(){
  this.position.x++;
  return this;
}

wgObject.prototype.moveleft = function moveLeft(){
  this.position.x--;
  return this;
}

wgObject.prototype.movetop = function moveTop(){
  this.position.y++;
  return this;
}

wgObject.prototype.movebottom = function moveBottom(){
  this.position.y--;
  return this;
}

/*
객체의 이동 방향을 나타내기 위한 enum
*/
var MoveDirection = {right: "right", left: "left", top: "top", bottom: "bottom"};

/*
객체의 Type에 대한 enum
*/
var WgObjType = {wgObject: "wgObject", worm: "worm", stone: "stone", wall: "wall", food: "food", field: "field"};

/*
다차원 배열을 생성하기 위한 객체. ui가 없이 솔루션을 통해 개발된 지렁이게임을 콘솔창에서 확인하기 위해서 만든 객체이다.
*/
var DimensionalArray = function DimensionalArray(){

}

DimensionalArray.prototype.set = function(){

}

var Worm = function Worm( id, position ){
  wgObject.apply( this, arguments );
  this.head = false;
  this.direction = MoveDirection.right;
  this.autoMove = false;
  this.type = WgObjType.worm;
  this.killWorm = true;
}
Worm.prototype = wgObject.create( wgObject.prototype );
Worm.prototype.constructor = Worm;

Worm.prototype.autoMove = function autoMove(){
  this[ "move" + this.direction ]();
  return this;
}

var Field = function Field( id, size ){
  this.id = id;
  this.size = size;
  this.children = {};
  this.worms = [];
  this.type = WgObjType.field;
}
Field.prototype = wgObject.create( wgObject.prototype );
Field.prototype.constructor = Field;

Field.prototype.add = function add( obj ){
  this.children[obj.id] = obj;
  
  
  return obj;
}

Field.prototype.getObjectById = function getObjectById( id ){
  return this.children.id;
}

Field.prototype.removeObjectById = function removeObjectById( id ){
  var type = this.children.id.type;
  // children에서 삭제
  delete this.children.id;
  
  // Worm 인스터스가 아니면 삭제 하지 않는다.
  if( !(WgObjType[type] == WgObjType.worm) ){
    return;
  }
  
  // Worm 인스턴스라면 삭제 필요
  var objIndex;
  this.worms.forEach(function( item, i ){
    if( item.id == id ){
      objIndex = i;
    }
  });
  
  this.worms.splice( objIndex, 1 );
}

Field.prototype.setWormDirection = function setWormDirection( direction ){
  // 지렁이 머리 객체의 위치를 set한다.
  this.worms[0].direction = direction;
}
