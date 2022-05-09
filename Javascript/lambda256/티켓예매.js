function solution(waiting) {
  let answer = [];
  for (let i = 0; i < waiting.length; i++) {
    const id = waiting[i];
    if(answer.indexOf(id) < 0) answer.push(id)
  }
  return answer
}

function solution2(waiting) {
  let answer = Array.from(new Set(waiting));
  return answer
}

solution([1,5,8,2,10,5,4,6,4,8])
solution2([1,5,8,2,10,5,4,6,4,8])