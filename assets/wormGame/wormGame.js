var $viewer = $( "#viewer" );
var fieldSize = {x: 30, y:15};
var wg = new WormGameEngine( fieldSize );
var arrMaker = new WormGameEngine.DimensionalArray( fieldSize );

function makeFoodObstacle(){
  wgObjPositions.foods.forEach(function( position, i ){
    wg.addObject( new WormGameEngine.Food( "Food" + i, position ) );
  });
  
  wgObjPositions.obstacles.forEach(function( position, i ){
    wg.addObject( new WormGameEngine.Obstacle( "Obstacle" + i, position ) );
  });
}

var startCallbacks = {
  print : function print(){
    $viewer.html( arrMaker.printField(wg.field) );
  },
  end : function(){
    console.log( "게임이 종료 되었습니다." );
  }
}
makeFoodObstacle();
startCallbacks.print();

// 지렁이 방향 변경
$( document ).on("keydown", function( e ){ 
  switch( e.keyCode ) {
    case 87:
      wg.wormHead.direction = WormGameEngine.MoveDirection.bottom;
      console.log("하");
      break;
    case 65:
      wg.wormHead.direction = WormGameEngine.MoveDirection.left;
      console.log("좌");
      break;
    case 83:
      wg.wormHead.direction = WormGameEngine.MoveDirection.top;
      console.log("상");
      break;
    case 68:
      wg.wormHead.direction = WormGameEngine.MoveDirection.right;
      console.log("우");
      break;
  }
});

// 게임 시작
$( "#btnGameStart" ).on("click", function(){
  wg.start( startCallbacks );
});

// 게임 일시정지
$( "#btnGamePause" ).on("click", function(){
  wg.pause();
});

// 게임 재시작
$( "#btnGameRestart" ).on("click", function(){
});

