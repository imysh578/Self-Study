import math

'''
여러줄
주석 달기
'''
# 한줄 주석 달기

# 연산자
print("연산자")
print(3 + 4.2)
print(4 - 6)
print(2 * 10)
print(1 / 4)
print(9 % 5)
print(13 // 3)
print(2 ** 3)
print("\n")

# Type casting
print("Type casting")
print(type(2))
print(type(1.5))
print(type("1.5"))
print(int(3.3))
print(float(2))
print("\n")

# 올림, 내림, 반올림
print("올림 내림 반올림")
print(math.ceil(3.2))
print(math.floor(3.2))
print(round(3.1592))
print(round(3.1592, 2))

'''
Q1.
현금 2만원, 햄버거 가격 3700원 => 최대 개수, 거스름돈은?
'''
balance =20000
price = 3700
hamburger = balance//price
exchange = balance%price

print(f'현금: {balance}, 햄버거 가격: {price} => 햄버거 최대 개수: {hamburger}, 거스름돈: {exchange}')

'''
문자열 사이에 변수를 출력하고 싶을 때,
=> f-string
문자열 앞에 f를 붙이고, 변수를 {}로 감싼다
print(f'문자열 {변수명} 문자열')
'''

'''
Q2.
치킨 가격: a원, 개수: x개, 배달비: b원 => 총 결제 금액은?   
'''
a = 17000
x = 3
b = 5000

total = a * x + b

print(f"총 결제 금액: {total}원")

'''
Q3.
y = 3x^2 + 2x - 7 식에서 x가 13일 때 y의 값은?
'''
x = 13
y = 3*x**2 + 2*x - 7
print(f'y = {y}')