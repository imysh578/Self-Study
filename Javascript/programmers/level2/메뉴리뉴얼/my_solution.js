function solution(orders, course) {
  let answer = [];

  course.forEach((num) => {
    let combinations = []

    orders.forEach((order, i) => {
      const menuList = [...order]
      let x = getCombinations(menuList, num)
      combinations.push(...x)
    })
    const map = new Map()
    combinations.forEach(comb => {
      map.set([...comb].sort().join(""), (map.get(comb) || 0) + 1)
    })
    const combCounts = Array.from(map).sort((a,b) => b[1] - a[1])
    let max = 0, result = []
    
    for (let i = 0; i < combCounts.length; i++) {
      const combCount = combCounts[i];
      if(combCount[1] >= max) {
        max = combCount[1]
      }
      else break
    }
    
    for (let i = 0; i < combCounts.length; i++) {
      const combCount = combCounts[i];
      if( max === combCount[1] && combCount[1] >= 2) result.push(combCount[0])  
    }
    
    answer.push(...result)
  })
  return answer.sort();
}

const getCombinations = (menuList, num) => {
  const combinations = []  
  if(num === 1) return menuList
  menuList.forEach((menu, i) => {
    const restCombinations = getCombinations(menuList.slice(i+1), num-1)
    restCombinations.forEach((restCombination) => {
      combinations.push(menu + restCombination)
    })
  })
  return combinations
}


solution(["XYZ", "XWY", "WXA"], [2,3,4])