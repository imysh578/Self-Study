// 소수 만들기
function solution(nums) {
  // 소수인지 확인
  const isPrime = (num) => {
    for (let i = 2; i*i <= num; i++) { // 숫자의 제곱근까지만 확인하면 됨
      if (num % i === 0) return false;
    }
    return true;
  }
  let answer = 0;
  
  // 3개 숫자 고르기
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      for (let k = j+1; k < nums.length; k++) {
        if(isPrime(nums[i]+nums[j]+nums[k])) { // 고른 숫자의 합이 소수면
          answer++
        }
      }
    }
  }
  
  return answer;
}

solution([1, 2, 7, 6, 4])