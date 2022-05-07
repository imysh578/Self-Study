function solution(dartResult) {
  const scoreRegExp = /\d+?[DST*#]+/g
  const darts = dartResult.match(scoreRegExp)

  var answer = [];
  for (let i = 0; i < darts.length; i++) {
    let el = darts[i];
    let result = Number(el.match(/\d+/g)[0])
    console.log(el.match(/\d+?[DST?\*#]+/g))
    if(el.match(/D/g)) {
      result = result**2
    }
    if(el.match(/T/g)) {
      result = result**3
    }
    if(el.match(/[#]/g)) {
      result *= -1
    }
    if(el.match(/[*]/g)) {
      if(answer[i-1]) answer[i-1] *= 2
      result *= 2
    }
    
    answer.push(result)
  }
  answer = answer.reduce((accu, curr) =>  accu + curr, 0)
  
  return answer;
}
solution("1D2S#10S")