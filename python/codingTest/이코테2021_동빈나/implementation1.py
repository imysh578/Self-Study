for i in range(5):
  for j in range(5):
    print(f'({i},{j})', end=' ')  

#     동 서 남 북
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

x, y = 2, 2

for i in range(4):
  nx = x + dx[i]
  ny = y + dy[i]
  print(nx, ny)