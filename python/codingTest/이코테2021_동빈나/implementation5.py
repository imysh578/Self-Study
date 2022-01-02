# input_data = list(input())

# result_list = sorted(input_data)
# sum = 0

# for elem in input_data:
#   if ord('0')<=ord(elem)<=ord('9'):
#     sum += int(elem)
#     result_list.remove(elem)
# result_list.append(str(sum))

# result = "".join(result_list)

# print(result)

data = input()
result = []
value = 0

for c in data:
  if c.isalpha():
    result.append(c)
  else:
    value += int(c)

if value != 0:
  result.append(str(value))

result.sort()

print(''.join(result))