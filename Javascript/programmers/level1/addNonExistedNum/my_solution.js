// 없는 숫자 더하기
function solution(numbers) {
  let answer = 0;
  for (let i = 1; i < 10; i++) {
    answer += i
  }
  numbers.forEach(num => {
    answer -= num
  });
  
  return answer;
}
solution([5,8,4,0,6,7,9])