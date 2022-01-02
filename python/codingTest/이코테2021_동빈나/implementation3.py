hours = int(input())

count = 0

for hour in range(hours+1):
  for min in range(60):
    for sec in range(60):
      time = str(hour).zfill(2) + str(min).zfill(2) + str(sec).zfill(2)
      if '3' in time:
        count += 1
      else:
        continue

print(count)

# 파이썬에서 컴퓨터는 1초에 2천만번 계산 수행
# 23시 59분 59초까지 모든 경우의 수는 86,400가지
# 따라서 완전 탐색 방법 사용 가능