'''
## 상하좌우 문제
- N x N 크기의 정사각형 공간 (1 x 1 크기의 정사각형으로 나누어져 있음)
- 가장 왼쪽 위 좌표: (1,1)
- 가장 오른쪽 아래 좌표: (N, N)
- 여행가는 상하좌우로 이동 가능하며, 시작 위치는 항상 (1,1)
- 이동 계획서에는 LRUD 문자가 반복적으로 적혀있다.
  - L: 왼쪽으로 한칸 이동
  - R: 오른쪽으로 한칸 이동
  - U: 위로 한칸 이동
  - D: 아래로 한칸 이동
- N x N 크기의 공간을 벗어나는 움직임은 무시된다고 할 때, 여행가가 최종적으로 도착할 지점을 구하는 프로그램을 작성하시오.
'''

N = int(input())
plans = input().split()

x, y = 1, 1

# L R U D
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
move_types = ['L', 'R', 'U', 'D']

for plan in plans:
    for i in range(len(move_types)):
        if plan == move_types[i]:
            nx = x + dx[i]
            ny = y + dy[i]

    if nx < 1 or ny < 1 or nx > N or ny > N:
        continue

    x, y = nx, ny

print(x, y)
