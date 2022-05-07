function solution(n, arr1, arr2) {
  // 10진수 => 2진수
  const decToBin = (dec) => {
    let temp = dec;
    result = []
    for (let i = 0; i < n; i++) {
      result.push(temp%2)
      temp = Math.floor(temp / 2)
    }
    result.reverse()
    return result
  }

  // 지도 해독
  arr1 = arr1.map((row) => decToBin(row))
  arr2 = arr2.map((row) => decToBin(row))
  
  // 두 지도 합친 후 벽이 있는 곳은 #으로 표시
  let answer = [];
  for (let i = 0; i < n; i++) {
    let r = ""
    for (let j = 0; j < n; j++) {
      r += arr1[i][j] + arr2[i][j] ? "#" : " "
    }
    answer.push(r)
  }
  return answer;
}

solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28])