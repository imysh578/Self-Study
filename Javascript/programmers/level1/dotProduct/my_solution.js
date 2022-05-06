function solution(a, b) {
  let answer = a.reduce((accu, curr, i) => {
    return accu += curr * b[i]
  }, 0)
  
  answer
  return answer;
}

solution([1,2,3,4], [-3,-1,0,2])