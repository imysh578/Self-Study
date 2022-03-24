/**
  1. 하나의 값을 입력받을 때
  const fs = require('fs');
  const input = fs.readFileSync("/dev/stdin").toString().trim();

  2. 공백으로 구분된 한 줄의 값들을 입력받을 때
  const fs = require('fs');
  const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

  3. 여러 줄의 값들을 입력받을 때
  const fs = require('fs');
  const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

  4. 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 공백으로 구분된 n개의 값들을 입력받을 때
  const fs = require('fs');
  const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split(/\s/);

  5. 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄부터 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
  const fs = require('fs');
  const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

  6. 하나의 값 또는 공백으로 구분된 여러 값들을 여러 줄에 걸쳐 뒤죽박죽 섞여서 입력받을 때
    ex) n 입력 - 공백으로 구분된 n개의 값 입력 - m 입력 - 여러 줄에 걸쳐 m개의 값 입력
  const fs = require('fs');
  const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s/);
  const n = input[0];
  const n_arr = input.slice(1, n+1);
  const [m, ...m_arr] = input.slice(n+1);
  
  @NOTE_
  배열에서 값의 타입을 String => Number : arr.map(v => +v) || arr.map(Number)
 */


  const fs = require('fs');
  const [n, ...n_arr] = fs.readFileSync("test.txt").toString().trim().split("\n");

  console.log(n_arr.map((el) => el.trim().split(" ")))

// const arr = input.split(" ").map(Number).sort((a,b) => b-a);
// const max = arr[0]
// const sum = arr.reduce((a,b) => a+b, 0);
// const answer = sum/length/max*100
// console.log(answer);