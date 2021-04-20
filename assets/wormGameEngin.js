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
var WgObjType = {wgObject: "wgObject", worm: "worm", obstacle: "obstacle",  food: "food", field: "field", wall: "wall"};

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
  
  // Worm 인스턴스라면 삭제 필요(this.worms 배열에서 제거)
  var objIndex;
  this.worms.forEach(function( item, i ){
    if( item.id == id ){
      objIndex = i;
    }
  });
  
  this.worms.splice( objIndex, 1 );
}

Field.prototype.setWormHeadDirection = function setWormHeadDirection( direction ){
  // 지렁이 머리 객체의 위치를 set한다.
  this.worms[ 0 ].direction = direction;
  return this.worms;
}

Field.prototype.moveWorms = function moveWorms(){
  for( var i = 1; i < this.worms.length; i++ ){
    this.worms[i].direction = this.worms[i-1].direction;
  }
  
  return this.worms;
}

Field.prototype.setEdgeWalls = function setEdgeWalls(){
  var xSize = this.size.x;
  var ySize = this.size.y;
  // 상단 x 축
  for( var i=0; i < xSize - 1; i++ ){
    this.children[ "x_top_" + i ] = new Wall( "x_top_" + i, {x:i, y:0} );
  }
  
  // 하단 x 축
  for( var i=0; i < xSize - 1; i++ ){
    this.children[ "x_bottom_" + i ] = new Wall( "x_bottom_" + i, {x:i, y:ySize-1} );
  }
  
  // 왼쪽 y 축
  for( var i=0; i < ySize - 1; i++ ){
    this.children[ "y_left_" + i ] = new Wall( "y_left_" + i, {x:0, y:i} );
  }
  
  // 오른쪽 y 축
  for( var i=0; i < ySize - 1; i++ ){
    this.children[ "y_left_" + i ] = new Wall( "y_left_" + i, {x:xSize-1, y:i} );
  }
  
  return this.children;
}

var Obstacle = function Obstacle( id, position ){
  wgObject.apply( this, arguments );
  this.killWorm = true;
  this.type = WbObjType.obstacle;
}
Obstacle.prototype = wgObject.create( wgObject.prototype );
Obstacle.prototype.constructor = Obstacle;



