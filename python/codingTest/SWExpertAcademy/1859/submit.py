T = int(input())

for i in range(T*2):
    buy = 0
    sell = 0
    sum = 0
    array = list(map(int, input().split()))
    if i % 2:
      while len(array):
        index_max = array.index(max(array))
        for j in range(index_max):
          buy += array[j]
        sell += index_max*array[index_max]
        sum = sell - buy
        array = array[index_max+1:]
        print(1)
      print(f'#{int(i/2)+1} {sum}')
    # while len(array):
    #     index_max = array.index(max(array))
    #     for i in range(index_max):
    #         buy += array[i]
    #     sell += index_max*array[index_max]
    #     sum = sell - buy
    #     array = array[index_max+1]
    # print(f'#{i/2} {sum}')
