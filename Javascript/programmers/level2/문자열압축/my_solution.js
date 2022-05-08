function solution(s) {
  let compressed = []
  for (let i = 1; i <= s.length/2+1; i++) {
    const regExp = new RegExp(`[a-z]{${i}}|[a-z]+`, 'g')
    const splitList = s.match(regExp)
    
    let result = []
    splitList.forEach((str, index) => {
      let prev = splitList[index-1]
      prev && prev === str ? result[result.length-1][0] += 1 : result.push([1, str])
    })
    result = result.map((el) => {
      el[0] = el[0] > 1 ? el[0] : "" 
      return el.join("")
    })
    result = result.join("")
    compressed.push(result.length)
  }
  
  let answer = Math.min(...compressed)
  return answer;
}

solution("abcabcabcabcdededededede")