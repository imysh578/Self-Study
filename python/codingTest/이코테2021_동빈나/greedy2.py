input_data = list(map(int, input()))

result = input_data[0]
for i in range(1, len(input_data)):
  current = input_data[i]
  previous = input_data[i-1]
  if previous <= 1:
    result += current
  else:
    result *= current

print(result)
