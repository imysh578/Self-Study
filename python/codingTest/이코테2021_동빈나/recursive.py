# # 함수를 연속적으로 호출하면 스택 프레임을 사용하게 됨 
# # => 스택을 사용해야할 때 재귀함수 쓰는 경우가 많음
# def recursive_function(i):
#   # 종료 조건: 10번째 재귀함수에서 종료
#   if i == 10:
#     return
#   print(i, '번째 재귀함수에서', i+1, '번째 재귀 함수를 호출합니다.')
#   recursive_function(i+1)
#   print(i, '번째 재귀함수를 종료합니다.')

# recursive_function(1)


# # 팩토리얼 구현
# # 1. for문으로 구현하는 방법
# def factorial_iterative(n):
#   result = 1
#   for i in range(1, n+1):
#     result *= i
#   return result
# print(factorial_iterative(5))

# # 2. 재귀함수로 구현하는 방법
# def factorial_recursive(n):
#   if n<=1: # n이 1이하면 1을 반환
#     return 1
#   return n * factorial_recursive(n-1)
# print(factorial_recursive(5))

# 최대공약수 계산(유클리드 호제법)
# A, B는 자연수, A > B, R = A%B 일떄
# A와 B의 최대공약수는 B와 R의 최대공약수와 같다

def gcd_function(a, b):
  r = a%b
  if r == 0:
    return b
  else :
    return gcd_function(b, r)

print(gcd_function(192, 162))