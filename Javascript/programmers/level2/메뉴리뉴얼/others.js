function solution(orders, course) {
  var answer = [];
  for (const selectNum of course) {
    let combinations = []
    for (const order of orders) {
      getCombinations(Array.from(order), selectNum)
        .map(combination => combination.sort().join(''))
        .forEach(combString => combinations.push(combString))
    }
    
    const combCounts = combinations.reduce((counts, combination) => {
      counts[combination] = (counts[combination] || 0) + 1;
      return counts;
    }, {});
    
    let maxCount = 0, maxComb = []
    for (const comb in combCounts) if (combCounts[comb] >= maxCount) maxCount = combCounts[comb]
    for (const comb in combCounts) if (combCounts[comb] === maxCount && maxCount >= 2) maxComb.push(comb)
    answer.push(...maxComb)
  }
  answer = answer.sort()
  return answer;
}

const getCombinations = (array, selectNum) => {
  const result = [];
  if (selectNum === 1) {
    console.log(array);
    return array.map((element) => [element])
  };
  array.forEach((fixed, index, origin) => {
    const restCombinations = getCombinations(origin.slice(index + 1), selectNum - 1);
    restCombinations
    const attached = restCombinations.map((restCombination) => {
      return [fixed, ...restCombination]
    });
    result.push(...attached);
  });
  return result;
}

// solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])
solution(["XYZ", "XWY", "WXA"], [2])

