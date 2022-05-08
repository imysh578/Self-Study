function solution(orders, course) {
  let orderedMenu = {}
  orders.forEach((order) => {
    for (let i = 0; i < order.length; i++) {
      const chr = order[i]
      orderedMenu[chr] = (orderedMenu[chr] || 0) + 1
    }
  })
  orderedMenu

  course.forEach((num) => {
    const menuList = orders.filter((order) => order.length === num)
    menuList.forEach((menu) => {
      let counts = []
      for (let i = 0; i < menu.length; i++) {
        const chr = menu[i];
        counts.push(orderedMenu[chr])
      }
      counts = Math.min(...counts)
    })
  })
  var answer = [];
  return answer;
}

solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])