## Dictionary 자료형
- key-value 쌍의 데이터를 가지는 자료형
- 순차적으로 저장하지 않음
- 변경 불가능한 자료형을 키로 사용할 수 있다
- 해시 테이블 이용 => 데이터 조회 및 수정할 때 O(1) 시간에 처리

```python
data = dict()
data['사과'] = 'Apple'
data['바나나'] = 'Banana'
data['딸기'] = 'Strawberry'

print(data) # {'사과' : 'Apple', '바나나' : 'Banana', '코코넛' : 'Coconut'}

if '사과' in data:
    print("'사과'를 키로 가지는 데이터가 존재합니다")

# keys() : 키 데이터만 가진 리스트 출력
key_list = data.keys()

# values() : 값 데이터만 가진 리스트 출력
key_values = data.values()

# 키 값 각각 출력
for key in key_list:
    print(data[key])
```

## Set 자료형
- 중복 허용하지 않는다
- 순서가 없다
- 리스트 또는 문자열을 이용해서 초기화 가능 : set() 함수 사용
- 중괄호 안에 콤마를 기준으로 구분하여 삽입 
- 데이터 조회 및 수정 시간 : O(1)
```python
# 초기화 방법 1
data = set([1, 1, 2, 3, 4, 4, 5])
print(data) # {1, 2, 3, 4, 5}

# 초기화 방법 2
data2 = {1, 1, 2, 3, 4, 4, 5}
print(data2) # {1, 2, 3, 4, 5}
```

### 연산 
- 합집합, 교집합, 차집합
```python
a = set([1, 2, 3, 4, 5])
b = set([3, 4, 5, 6, 7])

# 합집합
print(a|b)

# 교집합
print(a&b)

# 차집합
print(a-b)
```

### 관련 함수들
```python
data = set([1, 2, 3])

# 원소 추가
data.add(4)

# 새로운 원소 여러개 추가
data.add([5, 6])

# 특정 원소 삭제
data.remove(3)

print(data) # {1, 2, 4, 5, 6}
```


