function solution(arr)
{
  let answer = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    const curr = arr[i];
    const prev = arr[i-1]
    if(curr !== prev) answer.push(curr)
  }
  
  return answer;
}

solution([1,1,3,3,0,1,1])