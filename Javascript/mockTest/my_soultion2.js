function solution(answers) {
  let methods =[
    [1,2,3,4,5,],
    [2,1,2,3,2,4,2,5,],
    [3,3,1,1,2,2,4,4,5,5,],
  ]

  const score = [0, 0, 0]

  answers.forEach((v, i) => {
    methods.forEach((method, j) => {
      if(v === method[i%method.length]) score[j]+=1
    })
  })

  let answer = []
  const max = Math.max(...score)
  score
		.sort((a, b) => b[1] - a[1])
		.forEach((v, i) => {if (v === max) answer.push(i+1)});
  
  return answer;
}