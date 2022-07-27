function solution(orders, course) {
  
  for (let i = 0; i < course.length; i++) {
    const num = course[i];
    const courseMap = new Map();
    
    for (let j = 0; j < orders.length; j++) {
      const order = orders[j];
      const x = getComb(order, num)
      console.log(x)
    }
  }
}

const getComb = (order, num, str = "") => {
  let comb = []
  console.log(num)
  if (num > 0 ) {
    str += order[0] || "" 
    console.log(str)
    for (let i = 0; i < order.length; i++) {
      console.log(order[0])
      getComb(order.slice(1), num-1, str)
    }
    comb.push(str)
    return str
  }
  else return order
};



solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [3])
// solution(["XYZ", "XWY", "WXA"], [2])
