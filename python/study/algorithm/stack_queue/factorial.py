'''
팩토리얼 구현 예제
'''

# for loop로 구현한 n!
def factorial_iterative(n):
    result = 1
    # 1부터 n까지의 수를 차례대로 곱하기
    for i in range(1, n+1):
        result *= i
    return result

# 재귀적으로 구현한 n!
def factorial_recursive(n):
    if n<=1: # n이 1이하인 경우 1을 반환
        return 1
    return n * factorial_recursive(n-1)

print(f'반복적으로 구현: {factorial_iterative(5)}')
print(f'재귀적으로 구현: {factorial_recursive(5)}')