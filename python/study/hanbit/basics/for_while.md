## 반복문
### while
```python
i = 1
result = 0

while i<=9:
    result += i
    i += 1

print(result)
```

```python
i = 1
result = 0

while i <= 9:
    if i % 2:
        result += i
    i += 1

print(result)
```

### for
#### in
- 특정한 변수 이용하여 `in` 뒤에 오는 데이터(리스트, 튜플, ...)에 포함되어 있는 원소를 첫 번째 인덱스부터 차례로 접근
```python
for 변수 in 리스트:
    실행할 코드
```

#### range()
- 연속적인 값을 차례로 순회할 때 주로 사용
- 인자가 하나라면 시작 값은 자동으로 0
```python
range(시작 값, 끝 값 + 1)
```

### 무한 루프
- 반복문을 작성할 때 항상 반복문을 탈출할 수 있도록 한다.
- 
### continue
- 반복문의 남은 코드의 실행을 건너뛰고 다음 반복 진행
```python
result = 0
for i in range(1, 10):
    if i % 2:
        continue
    result += i

print(result)
```

### break 
- 반복문 즉시 탈출
```python
i = 1

while True:
    print(f"현재 i의 값 {i}")
    if i == 5:
        break
    i += 1
```

### 중첩된 반복문
```python
for i in range(2, 10):
    for j in range(2, 10):
        print(f"{i} X {j} = {i*j}")
    print()
```