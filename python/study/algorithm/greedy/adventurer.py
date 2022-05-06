'''
## 모험가
- N명의 모험가
- 공포도: 위험 상황 대처 능력과 반비례
- 공포도가 X인 모험가는 반드시 X명 이상으로 구성한 모험가 그룸에 참여해야 함
- (단, 모든 모험가가 여행을 떠날 필요는 없다)
- N명의 모험가에 대한 정보가 주어졌을 때, 여행을 떠날 수 있는 그룹의 수의 최대값을 구하는 프로그램을 작성하시오.
'''

# 공포도가 작은 순서대로 먼저 그룹을 만든다.

N = int(input())
data = list(map(int, input().split()))
data.sort()

result = 0
count = 0

for num in data:
    count += 1
    if count >= num:
        result += 1
        count = 0

print(result)