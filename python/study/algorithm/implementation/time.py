'''
## 시각 문제
- 정수 N이 입력되면 00시 00분 00초부터 N시 59분 59초까지의 모든 시각 중 3이 하나라도 포함되는 모든 경우의 수를 구하는 프로그램을 작성하시오.

## 해결 아이디어
- 파이썬은 1초에 약 2천만번 연산 수행
- 00시 00분 00초 ~ 23시 59분 59초까지 : 86,400초 (24 * 60 * 60)
- 이런 경우에는 하나씩 모두 확인해봐도 된다.
=> 완전 탐색(Brute Frocing) : 가능한 경우의 수를 모두 검사해보는 탐색 방법
'''


# 내가 생각한 방법
N = int(input())

count = 0
test = 0
def hasThree(num):
    return (num % 10) == 3 or (num // 10) == 3

def getHowManyThree():
    cnt = 0
    for min in range(60):
        if hasThree(min):
            cnt+=60
        else:
            for sec in range(60):
                if hasThree(sec):
                    cnt+=1
    return cnt


for hour in range(N+1):
    if hasThree(hour):
        count += 60*60
    else:
        count += getHowManyThree()


print(count)

# 해답 예시
h = int(input())

count = 0
for i in range(h+1):
    for j in range(60):
        for k in range(60):
            # 매 시각 안에 3이 포함되어 있다면 카운트 증가
            if '3' in str(i) + str(j) + str(k):
                count += 1

print(count)
