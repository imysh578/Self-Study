## 함수
### 1. 함수 정의
```python
# 함수 정의하는 법
def 함수명(매개변수):
    실행할 코드
    return 반환값
```

### 2. 파라미터 지정하기
- 파라미터의 변수를 직접 지정해서 입력할 수 있다.
- 직접 지정하게 되면 순서에 영향을 받지 않는다.
```python
def add(a, b):
    return a+b

print(add(2,3)) # 5
print(add(b = 4, a = 3))# 7
```

### 3. global 키워드
- 함수 바깥에 선언된 변수를 참조할 때 사용
```python
def increaseA():
    global a
    a += 1

for i in range(10):
    increaseA()

print(a) # 10
```

- global 없이 전역 변수 사용이 불가능 하지만, 출력(print)은 가능하다.
```python
a = 0

def printA():
    print(a)

printA() # 0
```

- 전역 변수로 선언된 리스트는 global 없이도 메서드를 사용할 수 있다.
```python
array = [1, 2, 3]

def extendArray():
    array.append(4)

extendArray()
print(array) # [1, 2, 3, 4]
```

- 전역변수와 같은 이름의 지역변수를 선언한다면 함수 내에서는 지역변수를 우선적으로 처리한다.
```python
array = [1, 2, 3]

def extendArray():
    array = []
    array.append(4)
    print(f"array (local) : {array}") # [4]
    
extendArray()

print(f"array (global) : {array}") # [1, 2, 3]
```

### 4. 여러 개의 반환 값 
```python
def operator(a, b):
    add_var = a + b
    subtract_var = a - b
    multiply_var = a * b
    divide_var = a / b
    return add_var, subtract_var, multiply_var, divide_var # (packing)

a, b, c, d = operator(7, 3) # unpacking
print(a, b, c, d)
```

#### 5. 람다 표현식
- 함수를 한 줄에 작성 가능
```python
# 일반 함수 
def add(a, b):
    print(a+b)
    
add(3, 5) # 8


# 람다 표현식
print((lambda a, b: a + b)(3, 5)) # 8
```

```python
# 일반 함수
array = [("Thor", 50), ("Iron man", 32), ("Spider man", 18)]
def my_key(x):
    return x[1]

print(sorted(array, key = my_key)) # [('Spider man', 18), ('Iron man', 32), ('Thor', 50)]

# 람다 표현식
print(sorted(array, key = lambda x: x[1])) # [('Spider man', 18), ('Iron man', 32), ('Thor', 50)]
```

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

result = map(lambda a, b: a + b, list1, list2)

print(list(result))

```