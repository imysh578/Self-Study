function solution (num) {
  let answer = 0

  for (let i = 1; i <= num; i++) {
    let split = [...String(i)].map(v => Number(v))
    for (let j = 0; j < split.length; j++) {
      if(split[j] !== 0 && split[j] % 3 === 0) {
        answer+=1
        break;
      }
    }
  }
  answer
  return answer;
}

solution(13)