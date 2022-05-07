function solution(participant, completion) {
  let answer = ""
  const participantCounts = participant.reduce((accu, curr) => {
    accu[curr] = (accu[curr] || 0) + 1
    return accu
  }, {})
  

  completion.forEach(name => {
    participantCounts[name]--
  });
  Object.entries(participantCounts).map(([k,v]) => {
    if(v > 0) return answer = k
  })

  answer
  return answer;
}

function solution2(participant, completion) {
  let answer = ""
  let participantCounts = {}
  
  for (let i = 0; i < participant.length; i++) {
    const name = participant[i];
    const name2 = completion[i];
    participantCounts[name] = (participantCounts[name] || 0) + 1 
    name2 && (participantCounts[name2] = (participantCounts[name2] || 0) - 1)
  }

  Object.entries(participantCounts).forEach(([k,v]) => {
    if (v) answer = k
  })
  
  return answer;
}


solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"])
solution2(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"])