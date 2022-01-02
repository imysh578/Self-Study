

from collections import deque


N, M = map(int, input().split())

graph = []

for i in range(N):
  graph.append(list(map(int, input())))

count_num = 0


# 방향 벡터(상, 하, 좌, 우)
dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

# 괴물이 있는길 : 0
# 괴물이 없는길 : 1
# 지나간 길 : +1
def checkMonster(x,y):
  queue = deque()
  queue.append((x, y))
  # (r, c) = queue.popleft()
  while queue:
    # 반복할때마다 큐에서 popleft 실행
    (r, c) = queue.popleft()
    # 현재 위치에서 인접한 네가지 방향 확인
    for i in range(4):
      nr = r + dr[i]
      nc = c + dc[i]
      # 만약 범위에서 벗어난다면 무시
      if nr < 0 or nc < 0 or nr > N-1 or nc > M-1:
        continue
      # 만약 괴물이 있는길이면 패스
      if graph[nr][nc] == 0:
        continue
      # 처음 가는 길인 경우에만 queue에 기록
      if graph[nr][nc] == 1:
        graph[nr][nc] = graph[r][c] + 1
        queue.append((nr,nc))
      # 만약 출구에 도착한다면 바로 while문 탈출
      if (nr,nc) == (N-1,M-1):
        break
  return graph[N-1][M-1]



print(checkMonster(0,0))

