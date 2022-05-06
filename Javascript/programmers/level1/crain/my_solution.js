function solution(board, moves) {
	// row 방향으로 배열 다시 만들기
  let rows = [...new Array(board.length)].map(v => new Array(board.length))
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const element = board[i][j];
			rows[j][i] = element
		}
	}
	rows = rows.map((row) => row.filter(v=>v>0).reverse())

	let out = [] // 바구니 : 뽑은 인형들 담는곳
	let answer = 0

	// 인형 뽑기
	moves.forEach(el => {
		if(rows[el-1].length > 0) { // 해당 열에 인형이 있을 때
			let val = rows[el-1].pop() // 인형 뽑기
			// 만약 지금 뽑은 인형이 이전에 뽑은 인형과 같으면
			if(out[out.length-1] === val) { 
				out.pop() // 인형 제거
				answer += 2 // 제거된 인형 수 추가
			} 
			// 만약 지금 뽑은 인형이 이전에 뽑은 인형과 다르면
			else {
				out.push(val) // 바구니에 인형 담기
			}
		}
	});
	
  return answer;
}

solution(
	[
		[0, 0, 0, 0, 0],
		[0, 0, 1, 0, 3],
		[0, 2, 5, 0, 1],
		[4, 2, 4, 4, 2],
		[3, 5, 1, 3, 1],
	],
	[1, 5, 3, 5, 1, 2, 1, 4]
);