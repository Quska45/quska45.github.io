console.log("변경점 반영" + 234);
var $viewer = $( "#viewer" );
var fieldSize = {x: 50, y:50};
var wg = new WormGameEngine( fieldSize );
var arrMaker = new WormGameEngine.DimensionalArray( fieldSize );

$viewer.text( "이게 된다?" );
$viewer.text( arrMaker.printField(wg.field) );
console.log(arrMaker.printField(wg.field));



