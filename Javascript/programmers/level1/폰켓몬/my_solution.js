function solution(nums) {
  let set = new Set(nums).size;
  let answer = set > nums.length / 2 ? nums.length / 2 : set 
  return answer;
}

solution([3,3,3,2,2,4]	)