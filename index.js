/* 初期設定 */
// 駒を定義する処理
var empty = 0;
var black = 1;
var white = 2;
var board_data = [];

// 盤の中身を配列で初期化する処理
function InitBoardData () {
	for (var i = 0; i < 8; i++) {
		board_data[i] = [];
		for (var j = 0; j < 8; j++) {
		board_data[i][j] = empty;
		}
	}
	// 初期配置
	board_data[4][4] = 1;
	board_data[5][5] = 1;
	board_data[4][5] = 2;
	board_data[5][4] = 2;
}

InitBoardData();

// 盤に駒を置く処理
function put (board_data,i,j,color) {
	if (check(board_data,i,j,color) === false) {
		return false;
	}
	board_data[i][j] = color;
}

// 盤に駒を置けるかチェックする処理
function check(board_data,i,j,color){
  //すでに石がある場合
  if(board_data[i][j] != 0){
    return false;
  }
  //挟めない場合
  if(board_data[i][j]){
    false;
  }
  return true;
}
