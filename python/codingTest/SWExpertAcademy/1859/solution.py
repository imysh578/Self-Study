with open('./1859/input.txt', 'r') as read_file:
  lines = read_file.readlines()
  input_data_list = [list(map(int, line.split())) for line in lines]
  # print(input_data_list)

T = input_data_list.pop(0)[0]
# print(input_data_list)
# print(T)

for i in range(1, T+1):
  buy = 0
  sell = 0
  sum = 0
  array_length = input_data_list[(i-1)*2]
  array = input_data_list[i*2-1]

  while len(array):
    print(array)
    index_max = array.index(max(array))
    for i in range(index_max):
      buy += array[i]
    sell += index_max*array[index_max]
    sum = sell - buy
    array = array[index_max+1:]

  print(buy)
  print(sell)
  print(sum)
  print(array)
  # print(index_max)
  # print(array[index_max+1:])
