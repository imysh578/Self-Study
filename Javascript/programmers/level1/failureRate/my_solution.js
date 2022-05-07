function solution(N, stages) {
  const completed = new Map() // 스테이지에 도달한 플레이어 수
  const stuck = new Map() // 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    for (let i = 1; i <= stage; i++) {
      completed.set(i, (completed.get(i) || 0) + 1)
    }
    stuck.set(stage, (stuck.get(stage) || 0) + 1)
  }
  let failureRate = [];
  var answer = [];
  
  // 실패율 계산
  for (let i = 1; i <= N; i++) {
    failureRate.push([i, completed.get(i) ? (stuck.get(i) || 0)/completed.get(i) : 0])
  }
  failureRate.sort((next, curr) => curr[1] - next[1])
  answer = failureRate.map(([stage, v]) => stage)
  return answer;
}

solution(5, [2, 1, 2, 6, 2, 4, 3, 3])