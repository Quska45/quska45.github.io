// 필드 사이즈를 입력 받아서 랜덤한 포지션을 만들어 준다.
// 어떤식으로 위치를 만들어 줄지 잘 못정하겠다. 시간되면 하고 아니면 말자.
var PositionMaker = {
  getObstaclesPosition : function( fieldSize ){
    var obstaclesPosition = [];
    
    return obstaclesPosition;
  },
  getFoodsPosition : function( fieldSize ){
    var foodsPosition = [];

    return foodsPosition;
  }
};

var wgObjPositions = {
  foods : [
    {x:3, y:1}, {x:25, y:2}, {x:9, y:3}, {x:15, y:6},
    {x:7, y:8}, {x:19, y:10}, {x:23, y:11}, {x:17, y:13}
  ],
  obstacles : [
    {x:4, y:1}, {x:26, y:2}, {x:10, y:3}, {x:16, y:6},
    {x:8, y:8}, {x:20, y:10}, {x:24, y:11}, {x:18, y:13}
  ]
}