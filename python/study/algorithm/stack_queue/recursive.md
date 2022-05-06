## 재귀함수(Recursive Function)
- 자기 자신을 다시 호출하는 함수

```python
# 무한 호출되는 재귀 함수
def recursive_function():
    print('재귀 함수를 호출합니다.')
    recursive_function()

recursive_function()
```

- 무한 호출을 막기 위해 재귀함수의 종료 조건을 반드시 명시해야 한다.
```python
# 종료 조건을 포함한 재귀 함수
def recursive_function(i):
    if i == 100:
        return
    print(f'{i}번째 재귀함수에서 {i+1}번째 재귀함수를 호출합니다')
    recursive_function(i+1)
    print(f'{i}번째 재귀함수를 종료합니다.')

recursive_function(1) # 1~99번째 재귀
```