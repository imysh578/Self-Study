function solution(matrix, r) {
  const N = matrix.length // 정사각형 배열 가로 혹은 세로 길이
  var answer = matrix;
  for (let i = 0; i < r % 4; i++) { // 360도 돌면 제자리
      answer = rotate(answer, N)
  }
  answer
  return answer;
}

const rotate = (mat, size) => {
  let result = Array.from(Array(size), () => new Array(size).fill(null))
  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          result[j][size-1-i] = mat[i][j] // 90도 시계방향으로 돌림
      }
  }
  return result;
}

solution([[4,1,2], [7,3,4], [3,5,6]], 3)