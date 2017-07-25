/* 初期設定 */

// 駒の有無を定義する処理
var EMPTY = 0;
// 駒の色を定義する処理
var BLACK = 1;
var WHITE = 2;
// 盤の中身を配列で定義する処理
var board_data = [];
// 次に配置する駒の色を定義する処理
var nextColor = 0;
// 駒の描写を初期化する処理
var piece = '';
// 盤のidを初期化する処理
var cellid = '';
// 自分が配置する駒の座標を初期化する処理
var myPut_x = -1;
var myPut_y = -1;
//　ひっくり返す最初の駒を定義する処理
var end_x = -1;
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

/* 初期化関数 */

// 盤の生成と盤の中身を初期設定する処理
function InitialBoardData() {
	// 盤の要素を取得する処理
	var board = document.getElementById('board');
	for (var i = 0; i < 8; i++) {
		// 盤の列データを初期化する処理
		board_data[i] = [];
		// 盤の列を生成する処理
		var tr = document.createElement('tr');
		for (var j = 0; j < 8; j++) {
			// 盤のセルデータをEMPTYにする処理
			board_data[i][j] = EMPTY;
			// 盤のセルデータを生成する処理
			var td = document.createElement('td');
			// 盤のセルデータにidを付与する処理
			td.id = 'cell' + i + j;
			// 盤の列の下に、生成したセルデータを追加する処理
			tr.appendChild(td);
		}
		// 生成した列を盤に追加する処理
		board.appendChild(tr);
	}
	// 先手に配置する駒を黒に定義する処理
	nextColor = BLACK;
	// ゲーム開始時の盤の中身を初期定義する処理
	board_data[4][4] = 1;
	board_data[3][3] = 1;
	board_data[4][3] = 2;
	board_data[3][4] = 2;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			// 盤の中身が空の場合の処理
			if(board_data[i][j] === EMPTY){
				piece = '';
			}
			// 盤の中身が黒の場合の処理
			else if(board_data[i][j] === BLACK){
				piece = '●';
			}
			// 盤の中身が白の場合の処理
			else {
				piece = '○';
			}
			document.getElementById('cell' + i + j).textContent = piece;
		}
	}
};

InitialBoardData();

$('td').click(function(e) {
	if ($(this).textContent != null) {
		// クリックしたものの中身がある場合はリターン値を返す
		return;
	}
	setPiecesOnBoard(this);
});

// 駒を置く時の、初期設定をする処理
function init () {
	// 自分が配置した駒に対する盤（セル）のidを取得する処理　
	myPut_x = parseInt(cellid.slice(4,5));
	myPut_y = parseInt(cellid.slice(5,6));
	// 駒をひっくり返す際の対象である駒の位置を取得する処理
	target_x = myPut_x + dir_x;
	target_y = myPut_y + dir_y;
	//　ひっくり返す駒の末端を取得する処理
	end_x = -1;
	end_y = -1;
	// //	ひっくり返すかを判別する処理
	changeFlag = false;
}

// 盤をクリックした時の処理
function setPiecesOnBoard(obj) {
	// クリックした盤（セル）のidを取得する処理
	cellid = obj.id;
	// // 実際にひっくり返す処理を行うため、checkFlagをfalseにする
	// checkFlag = false;
	init();
	// 盤の中身が空の場合に実行する処理
	if(board_data[myPut_x][myPut_y] === EMPTY){
		// 次に配置する駒が黒の場合に行う処理
		if (nextColor === BLACK) {
			obj.textContent = '●';
			// 自分が配置した盤の中身を黒にする処理
			board_data[myPut_x][myPut_y] = BLACK;
		} else {
			//次に配置する駒が白の場合に行う処理
			obj.textContent = '○';
			//　自分が配置した盤の中身を白にする処理
			board_data[myPut_x][myPut_y] = WHITE;
		}
		// 全方向確認
		checkBoard();
		// 駒を配置できる場所が無い場合の処理
		if (skipFlag) {
			alert('その場所に駒を配置できません');
			obj.textContent = '';
			// 自分が配置した盤の中身を空にする処理
			board_data[myPut_x][myPut_y] = EMPTY;
		}

		else if (nextColor === BLACK) {
			nextColor = WHITE;
			document.getElementById('now_turn').textContent = '白';
		} else if (nextColor === WHITE) {
			nextColor = BLACK;
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
		if (board_data[target_x][target_y] === EMPTY) {
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
			if (nextColor === BLACK) {
				document.getElementById('cell' + x + y).textContent = '●';
			} else {
				document.getElementById('cell' + x + y).textContent = '○';
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
			document.getElementById('cell' + i + j).style.backgroundColor　= 'green';
		}
	}

	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board_data[i][j] === EMPTY) {
				cellid = 'cell' + i + j;
				checkBoard();
			};
		}
	}
}

function test(){
	//zskipの場合は相手のターンになる
	if(skipFlag){
		if (nextColor === BLACK) {
			nextColor = WHITE;
		} else if (nextColor === WHITE) {
			nextColor = BLACK;
		}
		alert('駒を配置できません。');
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
