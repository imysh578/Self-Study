T = int(input())

result = '1'
for i in range(2, T+1):
    ones = int(i%10)
    tens = int(i/10%10)
    hundreds = int(i/100%10)
    digit_list = [hundreds, tens, ones]
    count_num = 0
    for digit in digit_list:
        if digit%3 == 0 and digit != 0:
            count_num+=1
    if count_num:
        result = result + ' ' + '-'*count_num
    else:
        result = result + ' ' + str(i)
print(result)