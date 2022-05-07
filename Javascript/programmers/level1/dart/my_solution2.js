function solution(dartResult) {
  const bonusRule = {"S": 1, "D": 2, "T": 3}
  const optionRule = {"*": 2, "#": -1, undefined: 1}

  const darts = dartResult.match(/\d+?\D+/g)
  
  for (let i = 0; i < darts.length; i++) {
    const [num, bonus, option] = (darts[i].match(/\d+|\D/g))

    if(option === "*" && darts[i-1]) darts[i-1] *= optionRule['*']
    darts[i] = num ** bonusRule[bonus] * optionRule[option]
  }
  
  const answer = darts.reduce((accu, curr) => accu+curr, 0);
  return answer;
}

solution("1D2S#10S")