function solution(absolutes, signs) {
  var answer = 0;
  absolutes.forEach((el, i) => {
    answer = signs[i] ? answer + el : answer - el 
  });

  return answer;
}

solution([4,7,12], [true,false,true]	)