// 8. 필드 클래스
WormGameEngine.Field = function Field( id, size ){
  this.id = id;
  this.size = size;
  this.children = [];
  
  this.setEdgeObstacles();
}

WormGameEngine.Field.prototype.add = function add( obj ){
  this.children.push( obj );
  return obj;
}

WormGameEngine.Field.prototype.getObjectById = function getObjectById( id ){
  var wgObj = this.children.find(function( child ){
    return child.id == id;
  });
  return wgObj;
}

WormGameEngine.Field.prototype.removeObjectById = function removeObjectById( id ){
  var wgObj = this.children.find(function( child ){
    return child.id == id;
  });
  var wgObjIndex = this.children.findIndex(function( child ){
    return child.id == id;
  });

  // children에서 삭제
  this.children.splice( wgObjIndex, 1 );
}

WormGameEngine.Field.prototype.setEdgeObstacles = function setEdgeObstacles(){
  var xSize = this.size.x;
  var ySize = this.size.y;
  // 상단 x 축
  for( var i=0; i < xSize; i++ ){
    this.children.push(new WormGameEngine.Obstacle( "x_top_" + i, {x:i, y:0} ));
  }
  
  // 하단 x 축
  for( var i=0; i < xSize; i++ ){
    this.children.push(new WormGameEngine.Obstacle( "x_bottom_" + i, {x:i, y:ySize-1} ));
  }
  
  // 왼쪽 y 축
  for( var i=1; i < ySize - 1; i++ ){
    this.children.push(new WormGameEngine.Obstacle( "y_left_" + i, {x:0, y:i} ));
  }
  
  // 오른쪽 y 축
  for( var i=1; i < ySize - 1; i++ ){
    this.children.push(new WormGameEngine.Obstacle( "y_right_" + i, {x:xSize-1, y:i} ));
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
    if( 
      (this.children[item].position.x == this.worms[0].position.x)
      && (this.children[item].position.y == this.worms[0].position.y)
    ){
      return item;
    }
  }

  return null;
}