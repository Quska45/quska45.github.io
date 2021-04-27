function WormGameEngine( size ){
  this.score = 0;
  this.time = 0;
  this.field = new WormGameEngine.Field( "Field", size );
  this.startKey = null;
  this.debugger = WormGameEngine.Debugger;

  this.field.children.push( new WormGameEngine.Worm( "WormHead", size.x+1, size.y-1 ) );
}

WormGameEngine.prototype.addObject = function addObject( wgObject ){
  var object = this.field.getObjectById( wgObject.id );
  
  var isError = this.debugger.assert( object, "중복되는 아이디의 객체를 추가할 수 없습니다." );
  
  if(isError){
    return false;
  }

  this.field.add( wgObject );
}

WormGameEngine.prototype.start = function start( callback ){
  var self = this;
  this.field.children.forEach(function( child ){
    if( child instanceof WormGameEngine.Worm ){
      child.autoMove = true;
    }
  });

  this.startKey = setInterval(function(){
    // worms가 한칸 씩 이동
    var isGameOver = this.field.moveWorms();

    if( isGameOver ){
      clearInterval( this.startKey );
      console.log( "지렁이가 죽음." );
      callback();
    }

    // worm들의 방향 변경
    this.field.setWormsDirection();
    // 점수 증가
    this.score++;
    // 시간 증가
    this.time++;
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