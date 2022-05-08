function solution(answers) {
  let methods =[
    [1,2,3,4,5,],
    [2,1,2,3,2,4,2,5,],
    [3,3,1,1,2,2,4,4,5,5,],
  ]

  let result = methods.map((method, i) => {
    const score = answers.reduce((accu,curr, i) => {
      if(curr === method[i%method.length]) accu+=1
      return accu
    }, 0)
    return score
  }) 
  let answer = []
  const max = Math.max(...result)
  result
		.sort((a, b) => b[1] - a[1])
		.forEach((v, i) => {if (v === max) answer.push(i+1)});
  
  return answer;
}

solution([1,2,3,4,5])