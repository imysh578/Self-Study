function solution(array, commands) {
  let answer = commands.map((command) => {
    const [i, j, k] = command
    let sliced = array.slice(i-1, j)
    let result = sliced.sort((a,b) => a-b)[k-1]
    return result
  })
  
  return answer;
}

solution(
	[1, 5, 2, 6, 3, 7, 4],
	[
		[2, 5, 3],
		[4, 4, 1],
		[1, 7, 3],
	]
);