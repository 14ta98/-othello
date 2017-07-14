/* 初期設定 */
var empty = 0;
// 駒の色を定義する処理
var black = 1;
var white = 2;
// 次に配置する駒の色を定義する処理
var nextColor = 0;
// 駒の中身を初期化する処理
var board_data = [];
// 駒の描写を初期化する処理
var piece = "";
// 盤のidを初期化する処理
var cellid = '';
// 自分が配置する駒の座標を初期化する処理
var myPut_x = -1;
var myPut_y = -1;
//　ひっくり返す最初の駒を定義する処理	
var end_x = -1
var end_y = -1;
// 盤を確認する方向を定義する処理
var dir_x = -1;
var dir_y = -1;
// 駒をひっくり返す際の対象である駒の位置を初期化する処理
var target_x = -1;
var target_y = -1;


var changeFlag = false;
var skipFlag = false;
var checkFlag = false;

// 盤の中身を配列で初期化する処理
function InitialBoardData() {
	for (var i = 0; i < 8; i++) {
		board_data[i] = [];
		for (var j = 0; j < 8; j++) {
			board_data[i][j] = empty;
		}
	}
	// 先手に配置する駒を黒に定義する処理
	nextColor = black;
	// ゲーム開始時の駒の中身を初期定義する処理
	board_data[4][4] = 1;
	board_data[3][3] = 1;
	board_data[4][3] = 2;
	board_data[3][4] = 2;
	// 盤（セル）にidを定義する処理
	var table = document.getElementById("board");
	// 8マス分のtr要素を取得する（縦）
	for(var i = 0; i < table.rows.length; i++){
		// 8マス分のtr要素を取得する（横）
		for(var j = 0; j < table.rows[i].cells.length; j++){
			// 8×8マス分の縦横のセルに対してidを設定する
			table.rows[i].cells[j].id = "cell" + j + i;
		}
	}
	// 盤の中身に応じて、駒の表示をする処理
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			// 盤の中身が空の場合の処理
			if(board_data[i][j] == empty){
				piece = "";
			}
			//　盤の中身が黒の場合の処理
			else if(board_data[i][j]
				 == black){
				piece = "●";
			}	
			//	盤の中身が白の場合の処理
			else if(board_data[i][j] == white){
				piece = "○";
			}
			else {
				piece = "エラー";
			}
			document.getElementById("cell" + i + j).textContent = piece;
		}
	}
}

InitialBoardData();

$('td').click(function(e) { 
	if ($(this).textContent != null) { 
		return;
	}
	// console.log(this);
	setPiecesOnBoard(this);
	//test();	
});

// 変数初期化
function init () {
	// 自分が配置した駒に対する盤（セル）のidを取得する処理　
	myPut_x = parseInt(cellid.slice(4,5));
	myPut_y = parseInt(cellid.slice(5,6));
	// 駒をひっくり返す際の対象である駒の位置を取得する処理
	target_x = myPut_x + dir_x;
	target_y = myPut_y + dir_y;
	//　ひっくり返す駒の末端を取得する処理
	end_x = -1
	end_y = -1;
	//	ひっくり返すかを判別する処理
	changeFlag = false;
}

// 盤をクリックした時の処理
function setMark(obj) {
	// クリックした盤（セル）のidを取得する処理
	cellid = obj.id;
	// 実際にひっくり返す処理を行うため、checkFlagをfalseにする
	checkFlag = false;
	init();
	// 盤の中身が空の場合に実行する処理
	if(board_data[myPut_x][myPut_y] === empty){
		//　次に配置する駒が黒の場合に行う処理
		if (nextColor === black) {
			obj.textContent = "●";
			//　自分が配置した盤の中身を黒にする処理
			board_data[myPut_x][myPut_y] = black;
		} else {
			//次に配置する駒が白の場合に行う処理
			obj.textContent = "○";
			//　自分が配置した盤の中身を白にする処理
			board_data[myPut_x][myPut_y] = white;
		}
		// 全方向確認
		checkBoard();
		// 駒を配置できる場所が無い場合の処理
		if (skipFlag) {
			alert('その場所に駒を配置できません');	
			obj.textContent = '';
			// 自分が配置した盤の中身を空にする処理
			board_data[myPut_x][myPut_y] = empty;
		}

		else if (nextColor === black) {
			nextColor = white;
			document.getElementById('now_turn').textContent = '白';
		} else if (nextColor === white) {
			nextColor = black;
			document.getElementById('now_turn').textContent = '黒';
		} 

		isCheck();

	} else {
		alert('既に駒が配置されています。');
	} 
	skipFlag = false;
}	

function set() {
	// 確認している対象の駒が盤上にある場合に行う処理
	while(0 <= target_x && target_x <= 7 && 0 <= target_y && target_y <= 7 ) {
		// 盤上に挟む駒がない場合の処理
		if (board_data[target_x][target_y] === empty) {
			break;
		// 盤上に自分と同じ色の駒がある場合の処理
		} else if (board_data[target_x][target_y] === nextColor) {
			if (end_x!= -1 && end_y!= -1) {
				changeFlag = true;
			}
			break;
		// 盤上に自分と異なる色の駒がある場合の処理
		} else if (board_data[target_x][target_y] !== nextColor) {
			// 
			end_x  = target_x;
			end_y  = target_y;
			target_x = target_x+dir_x;
			target_y = target_y+dir_y;
			
		}
	} 
	//配置できる場所を確認する処理
	if (checkFlag && changeFlag) {
		document.getElementById(cellid).style.backgroundColor　= '#33CC33';
		//skipFlag = false;
		return false;
	}
	//ループ終了後に、f が true ならば（はさんだ相手ゴマがある）、盤面[px+dx][py+dy]～[bx][by]までを自分のコマにする
	else if (changeFlag) {
		var x = myPut_x;
		var y = myPut_y;
		//  末端までひっくり返す
		do {
			//　自分の置いた駒の隣から順にend_x,end_yまで駒をひっくり返す
			x = x + dir_x;
			y = y + dir_y;
			board_data[x][y] = nextColor;
			if (nextColor === black) {
				document.getElementById('cell' + x + y).textContent = "●";
			} else {
				document.getElementById('cell' + x + y).textContent = "○";
			}
		} while (x != end_x || y != end_y)
		skipFlag = false;
	}

	return true;
}

function checkBoard() {
	var isSkip;
	//　右方向確認
	dir_x = +1;
	dir_y = 0;
	init();
	isSkip &= set();
	// 左方向確認
	dir_x = -1;
	dir_y = 0;
	init();
	isSkip &= set();
	// 下方向確認
	dir_x = 0;
	dir_y = +1;
	init();
	isSkip &= set();
	// 上方向確認
	dir_x = 0;
	dir_y = -1;
	init();
	isSkip &= set();
	//　斜め右下
	dir_x = +1;
	dir_y = +1;
	init();
	isSkip &= set();
	//	斜め右上
	dir_x = +1;
	dir_y = -1;
	init();
	isSkip &= set();
	//	斜め左下
	dir_x = -1;
	dir_y = +1;
	init();
	isSkip &= set();
	//  斜め左上
	dir_x = -1;
	dir_y = -1;
	init();
	isSkip &= set();

	if(isSkip){
		skipFlag = true;
	}

}
//配置できる場所の確認
function isCheck () {
	// skipFlagを初期化する処理
	skipFlag = true;
	checkFlag = true;	
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			//緑に戻す
			document.getElementById("cell" + i + j).style.backgroundColor　= 'green';
		}
	}

	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board_data[i][j] === empty) {
				cellid = 'cell' + i + j;
				checkBoard();
			};
		}
	}
}

function test(){
	//　skipの場合は相手のターンになる
	if(skipFlag){
		if (nextColor === black) {
			nextColor = white;
		} else if (nextColor === white) {
			nextColor = black;
		} 
		alert("駒を配置できません。");	
	}
}

// 盤上にある白駒・黒駒を数える処理
function countCurrentPiecesOnBoard() { 
	var blackCount = 0; 
	var whiteCount = 0;
	for(var i = 0; i < 8; i++) { 
		for(var j = 0; j < 8; j++) { 
			var pieceInfo = board_data[i][j]; 
			if (pieceInfo === BLACK) { 
				blackCount++; 
			} else if (pieceInfo === WHITE) { 
				whiteCount++; 
			} 
		} 
	}
	var $blackScore = $('#black_score'); 
	var $whiteScore = $('#white_score');

	$blackScore.text(blackCount); 
	$whiteScore.text(whiteCount); 
};
