# N = int(input())
# A = list(input().split())

# # L R U D
# # dx = [0, 0, -1, 1]
# # dy = [-1, 1, 0, 0]
# L = [0, -1]
# R = [0, 1]
# U = [-1, 0]
# D = [1, 0]

# start = [1, 1]
# destination = [1, 1]
# def arrayAdd(a, b):
#   return [a + b for a, b in zip(a, b)]

# for move in A:
#   prev = destination
#   if move == 'L':
#     destination = arrayAdd(destination, L)
#   elif move == 'R':
#     destination = arrayAdd(destination, R)
#   elif move == 'U':
#     destination = arrayAdd(destination, U)
#   elif move == 'D':
#     destination = arrayAdd(destination, D)
#   else:
#     continue

#   if destination[0] == 0 or destination[1] == 0:
#     destination = prev

# print(destination[0], destination[1])
# # print(f'({destination[0]},{destination[1]})')


n = int(input())
x, y = 1, 1
plans = input().split()

dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
move_types = ['L', 'R', 'U', 'D']
nx = x
ny = y

for plan in plans:
  for i in range(len(move_types)):
    if plan == move_types[i]:
      nx = x + dx[i]
      ny = y + dy[i]
  if nx < 1 or ny < 1 or nx > n or ny > n:
    continue
  x = nx
  y = ny

print(x, y)