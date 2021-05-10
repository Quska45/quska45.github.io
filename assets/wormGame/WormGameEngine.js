function WormGameEngine( size ){
  this.score = 0;
  this.time = 0;
  this.field = new WormGameEngine.Field( "Field", size );
  this.startKey = null;
  this.debugger = WormGameEngine.Debugger;

  this.wormHead = new WormGameEngine.Worm( "WormHead", {x: 1, y: size.y-2} );
  this.wormHead.head = true;
  this.field.children.push( this.wormHead );
  this.wormBodyIndex = 0;
}

WormGameEngine.prototype.addObject = function addObject( wgObject ){
  var object = this.field.getObjectById( wgObject.id );
  
  //var isError = this.debugger.assert( object, "중복되는 아이디의 객체를 추가할 수 없습니다." );
  
  //if(isError){
  //  return false;
  //}

  this.field.children.push( wgObject );
}

WormGameEngine.prototype.start = function start( callbacks ){
  var self = this;
  this.field.children.forEach(function( child ){
    if( child instanceof WormGameEngine.Worm ){
      child.isAutoMove = true;
    }
  });

  this.startKey = setInterval(function(){
    // worms가 한칸 씩 이동. 지렁이의 머리가 움직인 위치에 객체가 있다면 리턴 받는다.
    var dupObj = self.field.moveWorms( self.wormHead );

    if( typeof callbacks.print == "function" ){
      callbacks.print();
    }

    switch( true ){
      case (dupObj instanceof WormGameEngine.Obstacle)
           || (dupObj instanceof WormGameEngine.Worm):
        clearInterval( self.startKey );
        if( typeof callbacks.end == "function" ){
          callbacks.end();
        }
        alert( "지렁이가 죽음" );
        break;
      case dupObj instanceof WormGameEngine.Food:
        //alert( "지렁이가 음식 먹음" );
        var isEat = self.wormHead.eatFood( dupObj );
        if( isEat ){
          var cloneId = "WormBody" + self.wormBodyIndex;
          var cloneDirection = self.field.children[self.field.children.length].direction;
          var clonePosition = self.field.children[self.field.children.length].direction.getPreviousPosition();
          ++self.wormBodyIndex;
          var cloneWorm = new WormGameEngine.Worm( cloneId, clonePosition );
          cloneWorm.direction = cloneDirection;
          self.field.children.push( cloneWorm );
        }
        break;
    }

    // worm들의 방향 변경
    self.field.setWormsDirection();
    // 점수 증가
    self.score++;
    // 시간 증가
    self.time++;
  }, 400);
}

WormGameEngine.prototype.pause = function pause(){
  this.field.children.forEach(function( child ){
    if( child instanceof WormGameEngine.Worm ){
      child.isAutoMove = false;
    }
  });

  clearInterval( this.startKey );
}

WormGameEngine.prototype.setWormDirection = function setWormDirection( direction ){
  this.field.setWormHeadDirection( direction );
}