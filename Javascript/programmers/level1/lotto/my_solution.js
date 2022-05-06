const lottos = [44, 1, 0, 0, 31, 25];
const win_nums = [31, 10, 45, 1, 6, 19];

function solution(lottos, win_nums) {
  const unknownCounts = lottos.filter((v) => v===0).length
  
  const selectedCounts = lottos.reduce((accu, curr) => {
    if(win_nums.includes(curr)) accu ++
    return accu
  }, 0)

  const max = selectedCounts + unknownCounts
  const min = selectedCounts

  const rank = [6, 6, 5, 4, 3, 2, 1]
  let answer = [rank[max], rank[min],]

  return answer;
}

solution(lottos, win_nums)