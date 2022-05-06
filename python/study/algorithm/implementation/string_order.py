'''
입력 : 알파벳 대문자와 숫자(0~9)로만 구성된 문자열
출력 : 모든 알파벳을 오름차순으로 정렬 + 모든 숫자를 더한 값
예시 : K1KA5CB7 => ABCKK13
'''

# 내 방법
string = input()

sortedString = sorted(string)

index = 0
for str in sortedString:
    if ord(str) - ord('0') < 10:
        index += 1
    else:
        break;


numbers = map(int, sortedString[:index])
sum = 0
for num in numbers:
    sum += num

result = "".join(sortedString[index:]) + str(sum)

print(result)