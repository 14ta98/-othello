/* 初期設定 */

// 駒を定義する処理
var empty = 0;
var black = 1;
var white = 2;

// 盤の中身を配列で初期化する処理
function InitialBoardData() {
	var board_data = [];
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

InitialBoardData();
