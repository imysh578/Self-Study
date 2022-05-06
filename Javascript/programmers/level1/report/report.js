
const report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]
const id_list = ["muzi", "frodo", "apeach", "neo"]
const k = 2;

function solution(id_list, report, k) {
  // 중복 제거
  let removeRepeat = [...new Set(report)].map(v=>v.split(" "))

  let reportedCounts = {} // 유저가 신고 당한 개수
  for (const el of removeRepeat) {
    reportedCounts[el[1]] = (reportedCounts[el[1]] || 0) + 1
  }

  // 유저가 받은 이메일 개수
  let mailCounts = {}
  for (const el of removeRepeat) {
    if(reportedCounts[el[1]] >= k) {
      mailCounts[el[0]] = (mailCounts[el[0]] || 0) + 1;
    }
  }

  let answer = id_list.map((id) => mailCounts[id] || 0)
  console.log(answer);
  return answer;
}

solution(id_list, report, k)
