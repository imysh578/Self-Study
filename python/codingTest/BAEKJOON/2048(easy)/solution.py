from collections import deque

N = int(input())
board = [list(map(int, input().split())) for _ in range(N)]
queue = deque()

# Up Down Left Right
dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

N =4
def move(r,c,dr,dc):
    while True:
        nr = r + dr
        nc = c + dc
        if nr < 0 or nc <0 or nr > N or nc > N:
            break
        
        if board[nr][nc] == 0:
            r = nr
            c = nc
            continue
        
        elif board[nr][nc] == board[r][c]:
            board[nr][nc] += board[r][c] 
            board[r][c] = 0
        break
    return r, c, board[r][c]

board = [[0]*4 for _ in range(4)]
print(move(0,0,0,1))


