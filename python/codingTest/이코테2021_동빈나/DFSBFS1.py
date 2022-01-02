N, M = map(int,input().split())

graph = []

  
for i in range(N):
  graph.append(list(map(int,input())))

# 구멍 : 0
# 칸막이 : 1
# 음료수 채운 부분 : 2

print(graph)
# DFS로 특정 노드를 방문하고 연결된 모든 노드들도 방문
def dfs(x, y):
  # 주어진 범위를 벗어나면 즉시 종료
  if x< 0 or x>=N or y<0 or y>=M:
    return False
  # 현재 노드가 0이면
  if graph[x][y] == 0:
    # 해당 노드에 음료수를 채움
    graph[x][y] = 2
    # 상하좌우 위치들도 모두 재귀적으로 호출
    dfs(x-1,y)
    dfs(x+1,y)
    dfs(x,y-1)
    dfs(x,y+1)
    return True
  # 현재 노드가 0이 아니면
  else:
    return False


result = 0

for r in range(N):
  for c in range(M):
    if dfs(r,c) == True:
      print(r,c)
      result += 1

print(graph)
print(result)

