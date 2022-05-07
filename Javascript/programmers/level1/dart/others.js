function solution(dartResult) {
  const bonus = { 'S': 1, 'D': 2, 'T': 3 },
        options = { '*': 2, '#': -1, undefined: 1 };

  let darts = dartResult.match(/\d.?\D/g);
  darts
  for (let i = 0; i < darts.length; i++) {
      let split = darts[i].match(/(^\d{1,})(S|D|T)(\*|#)?/),
          score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];
      if (split[3] === '*' && darts[i - 1]) darts[i - 1] *= options['*'];

      darts[i] = score;
  }

  return darts.reduce((a, b) => a + b);
}

solution("1D2S#10S")
