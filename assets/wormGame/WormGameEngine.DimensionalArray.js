/*
2. 다차원 배열을 생성하기 위한 객체. ui가 없이 솔루션을 통해 개발된 지렁이게임을 콘솔창에서 확인하기 위해서 만든 객체이다.
*/
WormGameEngine.DimensionalArray = function DimensionalArray( size ){
  this.size = size;
  this.arr = [];
}

WormGameEngine.DimensionalArray.prototype.setArrBySize = function( size ){
  this.size = size;
  var xSize = this.size.x;
  var ySize = this.size.y;
  
  for(var i = 0; i < xSize; i++){
    this.arr.push( [] );
    for(var j = 0; j < ySize; j++){
      this.arr[i][j] = " ";
    }  
  }
  
  return arr;
}

WormGameEngine.DimensionalArray.prototype.printField = function( field ){
  var self = this;
  var lineStr = "";
  
  for(var i = 0; i < field.size.y; i++){
    self.arr.push([]);
  }

  // 출력될 배열 생성
  for(var i = 0; i < field.size.y; i++){
    for(var j = 0; j < field.size.x; j++){
      var _child = field.children.find(function( child ){
        return (child.position.y == i) && (child.position.x == j);
      });

      if( !_child ){
        self.arr[i][j] = "□";
      } else {
        switch( true ) {
          case (_child instanceof WormGameEngine.Worm):
            self.arr[i][j] = "◎";
            break;
          case (_child instanceof WormGameEngine.Obstacle):
            self.arr[i][j] = "■";
            break;
          case (_child instanceof WormGameEngine.Food):
            self.arr[i][j] = "☆";
            break;
          default:
            self.arr[i][j] = "□";
        }
      }
    }
  }
  
  // 배열 출력
  for(var i = 0; i < self.arr.length; i++){
    var line = "";
    for(var j = 0; j < self.arr[0].length; j++){
      line += self.arr[i][j];
    }
    console.log(line);
    lineStr += line + "\n";
  }

  self.arr = [];
  
  return lineStr.replaceAll("\n", "<br>");
}