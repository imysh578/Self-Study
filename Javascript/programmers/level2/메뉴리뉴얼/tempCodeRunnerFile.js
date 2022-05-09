function solution(orders, course) {
  course.forEach((num) => {
    //TODO: 모든 주문에서 나올 수 있는 조합 만들기
    let combinations = []

    // orders.forEach((order, i) => {
    //   const menuList = order.match(/\w/g)
    //   console.log(menuList)
    //   getCombinations(menuList, num)
    // })
    const menuList = orders[0].match(/\w/g)
    getCombinations(menuList, 3)

  })

  var answer = [];
  return answer;
}

const getCombinations = (menuList, num) => {
  const combinations = []
  console.log(menuList)
  if(num === 1) {
    console.log(111111)
    console.log(menuList);
    console.log(222222)
    return menuList
  }
  menuList.forEach((menu, i) => {
    const restCombinations = getCombinations(menuList.slice(i+1), num-1)
    // console.log(restCombinations)
  })

  return combinations
}


solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])