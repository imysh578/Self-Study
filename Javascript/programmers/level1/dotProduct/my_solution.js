function solution(a, b) {
  let answer = a.reduce((accu, curr, i) => accu += curr * b[i], 0)

  return answer;
}

solution([1,2,3,4], [-3,-1,0,2])