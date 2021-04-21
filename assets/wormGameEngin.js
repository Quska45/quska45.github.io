function WormGameEngine( size ){
  this.score = 0;
  this.time = 0;
  this.field = new WormGameEngine.Field( "Field", size );
  this.startKey = null;
  this.debugger = WormGameEngine.Debugger
}

WormGameEngine.prototype.addObject = function addObject( wgObject ){
  var object = this.field.getObjectById( wgObject.id );
  
  var isError = this.debugger.assert( object, msg : "중복되는 아이디의 객체를 추가할 수 없습니다." );
  
  if(isError){
    return false;
  }

  this.field.add( wgObject );
}

WormGameEngine.prototype.start = function start(){
  var self = this;
  this.field.worms.forEach(function( worm ){
    worm.autoMove = true;
  });

  this.startKey = setInterval(function(){
    // worms가 한칸 씩 이동
    this.field.moveWorms();

    // worm들의 방향 변경
    this.field.setWormsDirection();
  }, 1000);
}

WormGameEngine.prototype.pause = function pause(){
  this.field.worms.forEach(function( worm ){
    worm.autoMove = false;
  });

  clearInterval( this.startKey );
}

WormGameEngine.prototype.setWormDirection = function setWormDirection( direction ){
  this.field.setWormHeadDirection( direction );
}

// 1. 객체 공통 클래스
WormGameEngine.WgObject = function WgObject( id, position ){
  this.id = id;
  this.position = position;
  isKillObj = false;
  isEdible = false;
  type = WormGameEngine.WgObjType.WgObject;
}

WormGameEngine.WgObject.prototype.moveByPosition = function remove( position ){
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

/*
2. 다차원 배열을 생성하기 위한 객체. ui가 없이 솔루션을 통해 개발된 지렁이게임을 콘솔창에서 확인하기 위해서 만든 객체이다.
*/
WormGameEngine.DimensionalArray = function DimensionalArray(){

}

WormGameEngine.DimensionalArray.prototype.set = function(){

}

/*
3. 객체의 이동 방향을 나타내기 위한 enum
*/
WormGameEngine.MoveDirection = {right: "right", left: "left", top: "top", bottom: "bottom"};

/*
4. 객체의 Type에 대한 enum
*/
WormGameEngine.WgObjType = {wgObject: "wgObject", worm: "worm", obstacle: "obstacle",  food: "food", field: "field"};

// 5. 지렁이 클래스
WormGameEngine.Worm = function Worm( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.head = false;
  this.direction = WormGameEngine.MoveDirection.right;
  this.autoMove = false;
  this.type = WormGameEngine.WgObjType.worm;
  this.isKillObj = true;
}
WormGameEngine.Worm.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Worm.prototype.constructor = WormGameEngine.Worm;

WormGameEngine.Worm.prototype.autoMove = function autoMove(){
  this[ "move" + this.direction ]();
  return this;
}

WormGameEngine.Worm.prototype.eatFood = function eatFood( wbObject ){
  if(wbObject.isEdible){
    return
  }
}

// 6. 먹이 클래스
WormGameEngine.Food = function Food( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  isEdible = true;
}
WormGameEngine.Food.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Food.prototype.constructor = WormGameEngine.Food;

// 7. 장애물 클래스
WormGameEngine.Obstacle = function Obstacle( id, position ){
  WormGameEngine.WgObject.apply( this, arguments );
  this.isKillObj = true;
  this.type = WormGameEngine.WbObjType.obstacle;
}
WormGameEngine.Obstacle.prototype = Object.create( WormGameEngine.WgObject.prototype );
WormGameEngine.Obstacle.prototype.constructor = WormGameEngine.Obstacle;

// 8. 필드 클래스
WormGameEngine.Field = function Field( id, size ){
  this.id = id;
  this.size = size;
  this.children = {};
  this.worms = [];
  this.type = WormGameEngine.WgObjType.field;
}

WormGameEngine.Field.prototype.add = function add( obj ){
  this.children[obj.id] = obj;
  return obj;
}

WormGameEngine.Field.prototype.getObjectById = function getObjectById( id ){
  return this.children.id;
}

WormGameEngine.Field.prototype.removeObjectById = function removeObjectById( id ){
  var type = this.children.id.type;
  // children에서 삭제
  delete this.children.id;
  
  // Worm 인스터스가 아니면 삭제 하지 않는다.
  if( !(WormGameEngine.WgObjType[type] == WormGameEngine.WgObjType.worm) ){
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

WormGameEngine.Field.prototype.setWormHeadDirection = function setWormHeadDirection( direction ){
  // 지렁이 머리 객체의 위치를 set한다.
  this.worms[ 0 ].direction = direction;
  return this.worms;
}

WormGameEngine.Field.prototype.setWormsDirection = function setWormsDirection(){
  for( var i = 1; i < this.worms.length; i++ ){
    this.worms[i].direction = this.worms[i-1].direction;
  }
  
  return this.worms;
}

WormGameEngine.Field.prototype.setEdgeObstacles = function setEdgeObstacles(){
  var xSize = this.size.x;
  var ySize = this.size.y;
  // 상단 x 축
  for( var i=0; i < xSize - 1; i++ ){
    this.children[ "x_top_" + i ] = new WormGameEngine.Obstacle( "x_top_" + i, {x:i, y:0} );
  }
  
  // 하단 x 축
  for( var i=0; i < xSize - 1; i++ ){
    this.children[ "x_bottom_" + i ] = new WormGameEngine.Obstacle( "x_bottom_" + i, {x:i, y:ySize-1} );
  }
  
  // 왼쪽 y 축
  for( var i=0; i < ySize - 1; i++ ){
    this.children[ "y_left_" + i ] = new WormGameEngine.Obstacle( "y_left_" + i, {x:0, y:i} );
  }
  
  // 오른쪽 y 축
  for( var i=0; i < ySize - 1; i++ ){
    this.children[ "y_left_" + i ] = new WormGameEngine.Obstacle( "y_left_" + i, {x:xSize-1, y:i} );
  }
  
  return this.children;
}

WormGameEngine.Field.prototype.moveWorms = function moveWorms(){
  var isKillWorm = true;
  var self = this;
  // worms가 한칸 씩 이동
  this.worms.forEach(function( worm ){
    worm.autoMove();
  });

  for(var item in this.children){
    if( JSON.stringify(this.children[item].position) == JSON.stringify(this.worms[0]) ){
      return true;
    }
  }

  return false;
}

WormGameEngine.Debugger = {
  assert : function assert( value, msg ){
    if( value ){
      console.assert( value, {msg : msg} );
      retun false;
    } else {
      retun true;
    }
  },
  log : function log( msg ){
    console.log( msg );
  }
}


