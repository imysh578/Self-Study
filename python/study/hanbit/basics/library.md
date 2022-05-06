## 유용한 표준 라이브러리
- 내장함수
- itertools
- heapq
- bisect
- collections
- math
### 1. 내장함수
```python
# sum()
result = sum([1, 2, 3, 4, 5])
print(result) # 15

# min(), max()
min_result = min(7, 3, 5, 2)
max_result = max(7, 3, 5, 2)
print(min_result, max_result) # 2 7

# eval() : string으로 표현 된 식을 계산해줌
result = eval('(3+5)*7')
print(result) # 56

# sorted()
result = sorted([9, 1, 8, 4, 5])
reverse_result = sorted([9, 1, 8, 4, 5], reverse=True)
print(result) # [1, 4, 5, 8, 9]
print(reverse_result) # [9, 8, 5, 4, 1]

# sorted() with key
array = [('Thor', 40), ('Stark', 100), ('Groot', 20)]
result = sorted(array, key=lambda x: x[1], reverse=True)
print(result) # [('Stark', 100), ('Thor', 40), ('Groot', 20)]
```

### 2. itertools
#### 순열과 조합
- 순열 : 서로 다른 n개에서 서로 다른 r개를 선택하여 일렬로 나열 => nPr
- 조합 : 서로 다른 n개에서 순서에 상관 없이 서로 다른 r개를 선택 => nCr

```python
# 조합
from itertools import combinations

data = ['A', 'B', 'C']

result = list(combinations(data, 2)) # data에서 2개를 뽑는 모든 경우의 수
print(result) # [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

```python
# 중복 순열
from itertools import product

data = ['A', 'B', 'C']
result = list(product(data, repeat=2)) # 2개를 뽑는 모든 순열 구하기(중복허용)
print(result) # [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'B'), ('B', 'C'), ('C', 'A'), ('C', 'B'), ('C', 'C')]
```

```python
# 중복 조합
from itertools import combinations_with_replacement

data = ['A', 'B', 'C']

result = list(combinations_with_replacement(data, 2)) # 2개를 뽑는 모든 조합 구하기(중복 허용)
print(result) # [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')]
```

### 3. Counter
- 등장 횟수를 세는 기능 제공
- 리스트와 같은 반복 가능한 객체가 주어졌을 때, 내부의 원소가 몇 번씩 저장됐는지 확인할 수 있다.
```python
from collections import Counter

counter = Counter(['red', 'blue', 'red', 'green', 'blue', 'blue'])

print(counter['blue'])  # 3
print(counter['red'])   # 2
print(counter['green']) # 1
print(dict(counter)) # {'red': 2, 'blue': 3, 'green': 1}
```

### 4. Math
#### gcd() : 최대공약수
```python
# 최대공약수, 최소공배수 계산
import math

# 최소 공배수 계산
def lcm(a, b):
    return a * b // math.gcd(a, b)

print(math.gcd(21,14)) # 7
print(lcm(21, 14)) # 42
```