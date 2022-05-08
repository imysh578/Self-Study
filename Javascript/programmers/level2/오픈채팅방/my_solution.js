function solution(record) {
  const nicknameForId = new Map() // ID와 Nickname 매칭
  const message = { // action에 따른 메세지
    "Enter" : "님이 들어왔습니다.",
    "Leave" : "님이 나갔습니다."
  }
  const logger = [] // Change를 제외한 로그

  // 닉네임 변경 확인 및 change 로그 제외하기
  record.forEach((log) => {
    const [action, id, nickName] = log.split(" ")
    if(action !== "Leave") {
      nicknameForId.set(id, nickName)
    }
    if(action !== "Change") {
      logger.push([action, id])
    }
  })
  
  // 변경된 닉네임으로 로그 다시 출력
  let answer = []
  logger.forEach((log) => {
    const [action, id] = log
    if(action !== "Change") {
      answer.push(`${nicknameForId.get(id)}${message[action]}`)
    }
  });
  return answer;
}

solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"])
