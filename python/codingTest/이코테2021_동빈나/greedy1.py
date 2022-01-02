N,K = map(int, input().split())

count_num = 0

while True:
  if N<K:
    count_num += (N-1)
    break
  if N%K:
    count_num += N%K
    N -= N%K
  else:
    count_num += 1
    N = N//K
print(count_num)
