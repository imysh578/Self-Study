from collections import deque

R, C = map(int, input().split())

board = []
for n in range(R):
    board.append(list(input()))
visited = [[[[False]*C for r in range(R)] for c in range(C)] for r in range(R)]

# up down left right
dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

queue = deque()


def init():
    rr, rc, br, bc = [0]*4
    depth = 1

    # To find 'R' and 'B'
    for r in range(1, R-1):
        for c in range(1, C-1):
            if board[r][c] == 'R':
                rr, rc = r, c
            elif board[r][c] == 'B':
                br, bc = r, c
    queue.append((rr, rc, br, bc, depth))  # red and blue position + depth
    visited[rr][rc][br][bc] = True


def move(r, c, dr, dc):
    count = 0  # how many times moved
    while board[r+dr][c+dc] != '#' and board[r+dr][c+dc] != '#' and board[r][c] != 'O':
        r += dr
        c += dc
        count += 1
    return r, c, count


def findHole():
    init()
    while queue:
        rr, rc, br, bc, depth = queue.popleft()

        # move 4 direction
        for i in range(4):
            # near start position
            # nr: row of near position
            # cr: column of near position
            next_rr, next_rc, r_count = move(rr, rc, dr[i], dc[i])  # red
            next_br, next_bc, b_count = move(br, bc, dr[i], dc[i])  # blue
            if board[next_br][next_bc] == 'O':
                continue
            if board[next_rr][next_rc] == 'O':
                return depth
            if next_rr == next_br and next_rc == next_bc:
                if r_count > b_count:
                    next_rr -= dr[i]
                    next_rc -= dc[i]
                else:
                    next_br -= dr[i]
                    next_bc -= dc[i]
            if not visited[next_rr][next_rc][next_br][next_bc]:
                visited[next_rr][next_rc][next_br][next_bc] = True
                queue.append((next_rr, next_rc, next_br, next_bc, depth+1))
    return(-1)


print(findHole())
