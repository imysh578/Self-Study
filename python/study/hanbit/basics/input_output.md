## 표준 입력
- input() : 한 줄 문자열 입력
- map() : 리스트의 모든 원소에 각각 특정한 함수를 적용
```python
# 공백 기준으로 구분된 데이터 입력 받기
list(map(int, input().split()))

# 공백 기준으로 구분된 데이터가 많지 않을 때
a, b, c = map(int, input().split())
```

```python
n = int(input())
data = list(map(int, input().split()))

data.sort(reverse=True)
print(data)
```

## 빠른 입력
- sys 라이브러리 사용: sys.stdin.readline()
  - 엔터가 줄바꿈 기호로 입력됨 => rstrip()와 함께 사용

```python
import sys

# 문자열 입력 받기
data = sys.stdin.readline().rstrip()
print(data)
```

## 표준 출력
- print(): 각 변수를 콤마(,)를 이용해서 띄어쓰기로 구분하여 출력
  - 출력 이후 줄바꿈 수행 => end로 줄바꿈 방지

```python
a = 1
b = 2
print(a, b)
print(7, end=" ")
print(8, end=" ")
```

### f-string
- 문자열 앞에 접두사 'f'
- 중괄호 안에 변수명을 기입하여 문자열 사이에 변수를 입력할 수 있음
```python
answer = 7

print("정답은 "+ str(answer) + "입니다")
print(f"정답은 {answer}입니다")
```
