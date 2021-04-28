var $viewer = $( "#viewer" );
var fieldSize = {x: 30, y:15};
var wg = new WormGameEngine( fieldSize );
var arrMaker = new WormGameEngine.DimensionalArray( fieldSize );

var startCallbacks = {
  print : function print(){
    $viewer.html( arrMaker.printField(wg.field) );
  },
  end : function(){
    console.log( "게임이 종료 되었습니다." );
  }
}
startCallbacks.print();

$( document ).on("keydown", function (e) { 
  switch( e.keyCode ) {
    case 87:
      console.log("상");
      break;
    case 65:
      console.log("좌");
      break;
    case 83:
      console.log("하");
      break;
    case 68:
      console.log("우");
      break;
  }
});

wg.start( startCallbacks );
