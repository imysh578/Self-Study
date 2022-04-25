'''
8 x 8 좌표 평면, 이 공간 밖으로는 이동 할 수 없다.

체스 나이트 이동 방법
  1. 수평 두 칸 + 수직 한 칸
  2. 수직 두 칸 + 수평 한 칸

행 : 1~8
열 : a~h
'''

startAt = input()
startRow = int(startAt[1])
startCol = int(ord(startAt[0])) - int(ord('a')) + 1

# 나이트가 이동할 수 있는 8가지 방향 정의 : 튜플 활용 (row, col)
steps = [(-2, -1), (-1, -2), (1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1)]


result = 0
for step in steps:
    nextRow = startRow + step[0]
    nextCol = startCol + step[1]
    if nextRow >= 1 and nextRow <= 8 and nextCol >=1 and nextCol <= 8:
        result += 1

print(result)

