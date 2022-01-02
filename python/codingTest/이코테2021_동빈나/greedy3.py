T = int(input())

group = list(map(int, input().split()))
group.sort()

group_total = 0
count_num = 0

for N in group:
  count_num += 1
  if N <= count_num:
    group_total += 1
    count_num = 0
print(group_total)