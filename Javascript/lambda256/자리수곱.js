function solution(num) {
  const n = String(num).length
  let first = Math.floor(num / 10**(n/2))
  let second = num % 10**(n/2)

  // 두자리 수인 경우
  if(n==2) return first * 11

  // 앞 뒤 곱이 이미 같은 경우
  let mulFirst = [...String(first)].reduce((a,b) => Number(a)*Number(b), 1)
  let mulSecond = [...String(second)].reduce((a,b) => Number(a)*Number(b), 1)
  if(mulFirst === mulSecond) return num

  // 그 외 상황들
  let newNum = num
  while(true) {
    const n = String(newNum).length
    let arr1 = Math.floor(newNum / 10**(n/2))
    let arr2 = newNum % 10**(n/2)
    
    let result1 = [...String(arr1)].reduce((a,b) => Number(a)*Number(b), 1)
    let result2 = [...String(arr2)].reduce((a,b) => Number(a)*Number(b), 1)
    if(result1 === result2) break;
    newNum+=1
  }
  
  let answer = newNum;
  answer
  return answer
}

solution(235386)