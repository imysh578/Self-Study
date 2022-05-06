const new_id = "...!@BaT#*..y.abcdefghijklm"

function solution(new_id) {
  // step1
  let answer = new_id.toLowerCase();

  // step2
  answer = answer.match(/[a-z0-9._-]+/g).join("")

  // step3
  answer = answer.replace(/[.]+/g,".")

  // step4
  if(answer[0] === ".") answer = answer.slice(1,)
  if(answer[answer.length-1] === ".") answer = answer.slice(0,answer.length-1)

  // step5
  if(answer.length === 0) answer = "a"
  
  // step6
  answer = answer.slice(0,15)
  if(answer[answer.length-1] === ".") answer = answer.slice(0,answer.length-1)
  
  // step7
  while(true) {
    if(answer.length >= 3) break;
    answer += answer[answer.length-1]
  }
  
  return answer;
}

solution(new_id)