## 최대 공약수 계산(유클리드 호제법)
'''
유클리드 호제법
- 두 자연수 A,B에 대하여 (A > B) 일때 A를 B로 나눈 나머지를 R이라고 하자.
- 이때 A와 B의 최대공약수는 B와 R의 최대 공약수와 같다.
'''

A, B = input().split()

def gcd_recursive(a, b):
    if a % b == 0:
        return b
    else:
        return gcd_recursive(b, a%b)

print(gcd_recursive(192, 162))