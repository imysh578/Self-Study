with open('./2072/input.txt', 'r') as input_file:
  lines=input_file.readlines()
  # lines = [line.strip() for line in lines]
  data_length = int(lines[0])
  data_list = [map(int,(lines[i+1].split())) for i in range(data_length)]

result = []
for i, data in enumerate(data_list):
  sum = 0
  for el in data:
    if el%2:
      sum += el
    else:
      continue
  print(f"#{i+1} {sum}")
  result.append(f"#{i+1} {sum} \n")

with open('./2072/output.txt', 'w') as output_file:
  output_file.writelines(result)


# T = int(input())

# for test_case in range(1, T + 1):
#   data_list = list(map(int, input().split()))
#   sum_data = 0
#   for data in data_list:
#     if data % 2:
#       sum_data += data
#     else:
#       continue
# print(f"#{test_case} {sum_data}")
