// var solution=(_,$)=>_.find(_=>!$[_]--,$.map(_=>$[_]=($[_]|0)+1))
// 위의 식
var solution = (participant, completion) => {
  const result =  participant.find(
    (name) => {
      name
      completion
      console.log(completion[name]);
      return !completion[name]--
    },
    completion.map((name) => {
      name
      completion
      return (completion[name] = (completion[name] | 0) + 1)
    })
  );
  result
  return result
}

solution(["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"])

