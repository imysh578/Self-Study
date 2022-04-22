## 문자열 자료형

### 초기화
- 큰 따옴표 또는 작은 따옴표 사용
- `\"` 또는 `\'` 를 사용해서 큰 따옴표 혹은 작은 따옴표를 출력할 수 있다.
```python
data1 = 'Hello'
print(data1) # Hello

data2 = "World"
print(data2) # World

data3 = "Don't you know \"Python\""
print(data3) # Don't you know "Python"
```

### 연산
```python
# 덧셈 : 문자열 연결
a = "Hello"
b = "World"
print(a+" "+b) # Hello World

# 곱셈 : 여러번 반복
c = "Repeat"
print(c*3) # RepeatRepeatRepeat

# 슬라이싱 : 연결된 특정 문자열 가져오기
d = "ABCDEF"
print(d[1:4]) # BCD

# 특정 인덱스 값 변경은 불가능
d[0] = 'a' # 에러 발생!
```

## 튜플 자료형
- 리스트와 유사
- 한 번 선언된 값을 변경할 수 없다.
- 소괄호 사용
- 리스트 대비 공간 효율적
```python
a = (1, 2, 3, 4, 5, 6, 7, 8, 9)

# indexing
print(a[3]) # 4

# slicing
print(a[1:4]) # (2,3,4)

# immutable
a[2] = 8 # 에러 발생!!
```

### 사용하면 좋은 경우
- 서로 다른 성질의 데이터를 묶어서 관리할 때
  - 최단 경로 알고리즘에서는 (비용, 노드 번호) 형태로 자주 사용됨
- 데이터 나열을 Hashing의 key 값으로 사용해야 할 때
  - 변경 불가능 => key 값으로 사용될 수 있다.
- 메모리를 효율적으로 사용해야 할 때
