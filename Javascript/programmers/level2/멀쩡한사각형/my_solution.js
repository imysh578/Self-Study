function solution(w, h) {
  var answer = w * h;

  // 최대 공약수 구하기
  let gcd = 1;
  for (let i = 2; i <= Math.min(w,h); i++) {
    if(w % i === 0 && h % i === 0) {
      gcd = i
    }
  }

  // w * h 영역에서 잘린 사각형 개수 구하기
  let gradient = h/w
  let w2 = w/gcd
  let num = 0
  for (let i = 1; i <= w2; i++) {
    const a = Math.floor(gradient * (i-1))
    const b = Math.ceil(gradient * i)
    num += Math.abs(b-a)
  }
  num *= gcd

  // 총 사각형 개수에서 잘린 사각형 빼기
  answer -= num
  return answer;
}

solution(8, 12)