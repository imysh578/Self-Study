test_case = 10

for i in range(test_case):  
  data_length = int(input())
  input_data = list(map(int,input().split()))

  # 빈 공간 : 0
  # 빌딩 : 1
  # 조망권 있는 집 : 2
  buildings = []
  for w in range(0, data_length+4):
    buildings.append(([0]*max(input_data)))
    if 2<= w < data_length+2:
      for h in range(input_data[w-2]):
        buildings[w][h] = 1
  result = 0
  for w in range(data_length+4):
    if 2<= w < data_length+2:
      for h in range(input_data[w-2]):
        if buildings[w-1][h] == 0 and buildings[w+1][h] == 0:
          if buildings[w-2][h] == 0 and buildings[w+2][h] == 0:
            buildings[w][h] = 2
            result += 1
        else: 
          continue

  print(f'#{i+1} {result}')




