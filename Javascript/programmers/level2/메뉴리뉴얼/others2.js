function looper(menu, max, startIndex = 0, cur = 0, str = "") {
  if (menu.length < max) return [];
  if (menu.length === max) return [menu];
  
  let fullList = [];
  if (max === cur + 1) {
    let ans = [];
    for (let j = startIndex; j < menu.length - max + 1 + cur; j++) {
      ans.push(str + menu[j]);
    }
    return ans;
  } else {
    for (let i = startIndex; i < menu.length - max + 1 + cur; i++) {
      fullList = fullList.concat(
        looper(menu, max, i + 1, cur + 1, str + menu[i])
      );
    }
  }
  fullList
  return fullList;
}

function solution(orders, course) {
  let answer = [];
  course.forEach((n) => {
    var cands = {};
    orders.forEach((order) => {
      looper(order, n).forEach((candidateList) => {
        let sortedText = candidateList.split("").sort().join("");
        cands[sortedText] = ++cands[sortedText] || 1;
      });
    });

    let biggest = 2, //ignore menus less than 2
      list = [];

    for (const prop in cands) {
      if (cands[prop] > biggest) {
        list = [prop];
        biggest = cands[prop];
      } else if (cands[prop] === biggest) {
        list.push(prop);
      }
    }
    answer = answer.concat(list);
  });

  return answer.sort();
}

// solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])
solution(["XYZ", "XWY", "WXA"], [2,3,4])
