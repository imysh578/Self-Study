# DFS 메서드 정의
def dfs(graph, v, visited):
  # 현재 노드를 방문 처리
  visited[v] = True
  print(v, end=' ')
  # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for i in graph[v]:
    if not visited[i]:
      dfs(graph, i, visited)


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

dfs(graph, 1, visited)
