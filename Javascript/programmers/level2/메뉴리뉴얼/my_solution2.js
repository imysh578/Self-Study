const getComb = (order, num, startIndex = 0, count = 0, str = "") => {
  if(order.length < num) return []; // 코스 요리 개수 < 주문 수 ==> 빈배열
  if(order.length === num) return [order]; // 코스 요리 개수 == 주문 수 ==> 주문 그대로 

  // 
  if(count === num) {
    let result = []
    for (let i = startIndex; i < order.length - num + 1; i++) {
      const menu = order[i];
      result.push(str+menu)
    }
    result
    return result;
  }

  let combinations = [];
  for (let i = startIndex; i < order.length; i++) {
    combinations.push(...getComb(order, num, i+1, count+1, str+order[i]))
  }
  console.log(combinations)
  return combinations

};

function solution(orders, course) {
	course.forEach((num) => {
    let combinationsCounts = new Map()
		orders.forEach((order) => {
			getComb(order, num).forEach((combination) => {
        let sorted = [...combination].sort().join("")
        combinationsCounts.set(sorted, (combinationsCounts.get(sorted) || 0) + 1)
      })
		});
    console.log(combinationsCounts)
    console.log(Array.from(combinationsCounts))
    
	});



	var answer = [];
	return answer;
}

solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])
// solution(["ABCFG"], [2, 3, 4]);
