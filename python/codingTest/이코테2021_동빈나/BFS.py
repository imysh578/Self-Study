from collections import deque

# BFS 메서드 정의
def bfs(graph, start, visited):
  # 큐 구현을 위해 라이브러리 사용
  queue = deque([start]) # [start]를 포함한 queue 생성
  visited[start] = True
  while queue:
    # 큐에서 하나의 원소를 뽑아 출력하기
    print(queue)
    v = queue.popleft()
    print(v, end=" ")
    # 아직 방문하지 않은 인접한 원소들을 큐에 삽입
    for i in graph[v]:
      if not visited[i]:
        queue.append(i)
        visited[i] = True

# 각 노드가 연결된 정보를 표현(2차원 리스트)
graph = [
    [], # 시작노드가 보통 1로 시작하기 때문에 처음엔 일부러 빈값을 넣어줌
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
]

# 각 노드가 방문된 정보를 표현(1차원 리스트)
visited = [False] * 9 # 모든 노드의 초기값을 False로 줌(빈칸 때문에 원래 노드 개수보다 1개가 더 많다)

bfs(graph, 1, visited)
