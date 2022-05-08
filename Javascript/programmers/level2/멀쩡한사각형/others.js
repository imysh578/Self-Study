function solution(w,h){
  const slope = h / w;
  let result = 0;

  for(let i = 1; i <= w; i++){
    result += Math.ceil(slope * i);
  }
  result
  return ((h * w) - result) * 2;
}

solution(8, 12)
