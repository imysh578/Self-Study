# n = input()

# start = [c, r] = list(n)

# row_list = list('12345678')
# column_list = list('abcdefgh')

# dc = [-2, -2, -1, -1, 1, 1, 2, 2]
# dr = [-1, 1, -2, 2, -2, 2, -1, 1]

# count = 0

# for i in range(8):
#   if 0 <= row_list.index(r) + dr[i] < 8 and 0 <= column_list.index(c) + dc[i] < 8:
#     count += 1

# print(count)

input_data = input()

row = int(input_data[1])
column = ord(input_data[0]) - ord('a') + 1

steps = [(-2, -1), (-1, -2), (1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1)]

result = 0

for step in steps:
  next_row = row + step[0]
  next_column = column + step[1]
  if 0 < next_row <=8 and 0<next_column<=8:
    result+=1

print(result)