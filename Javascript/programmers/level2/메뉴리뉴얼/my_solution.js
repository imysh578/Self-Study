function solution(orders, course) {
  course.forEach((num) => {
    //TODO: 모든 주문에서 나올 수 있는 조합 만들기
    let combinations = []
    orders.forEach((order, i) => {
      const menuList = order.match(/\w/g)
      getCombinations(menuList, num)
    })

  })

  var answer = [];
  return answer;
}

const getCombinations = (menuList, num) => {
  const comb = []
  menuList
  if(num === 1) return menuList.map(v=>[v])
  menuList.forEach((menu, i) => {
    const restCombinations = getCombinations(menuList.slice(i+1), num-1)
    restCombinations
  })
  
}


solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])