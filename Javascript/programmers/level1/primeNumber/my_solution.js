// 소수 만들기
function solution(nums) {
  let selectedSums = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      for (let k = j; k < nums.length; k++) {
        selectedSums.push(i+j+k)
      }
    }
  }

  const isPrime = (num) => {
    for (let i = 0; i*i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  
  const answer = selectedSums.reduce((accu, curr) => {
    if(isPrime(curr)) accu += curr
    return accu
  }, 0)
  
  return answer;
}

solution([1,2,3,4])