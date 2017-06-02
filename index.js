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
	board_data[3][3] = 1;
	board_data[4][3] = 2;
	board_data[3][4] = 2;

	//tableにidを設定する
	var table = document.getElementById("board");
	for(var i = 0; i < table.rows.length; i++){
		for(var j = 0; j < table.rows[i].cells.length; j++){
			table.rows[i].cells[j].id = "cell" + i + j;
		}
	}

	//idごとに値を設定する
    var test = "";
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if(board_data[i][j] == empty){
				test = "";
			}
			else if(board_data[i][
				j] == black){
				test = "●";
			}
			else if(board_data[i][j] == white){
				test = "○";
			}
			else{
				test = "エラー";
			}
			document.getElementById("cell" + i + j).textContent = test;
		}
	};
}

function put(i,j,color){
　//石が置けるかチェックする
  if(check(i,j,color) == false){
    return false;
  }
  board_data[i][j] = color;
  //ひっくり返す処理

}

function check(i,j,color){
  //すでに石がある場合
  if(board_data[i],[j] != 0){
    return false;
  }
  //挟めない場合
  if(false){
    false;
  }

  return true;

}
