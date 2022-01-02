# cabinet = {3:'유재석', 100:'김태호'}

# print(cabinet)
# print(cabinet[3])
# print(cabinet[100])

# print(cabinet.get(3))
# # print(cabinet[5]) # 값이 없으면 에러 발생, 프로그램 종료
# print(cabinet.get(5)) # 값이 없으면 none을 출력, 이후 코드 실행
# print(cabinet.get(5, '사용 가능')) # 값이 없으면 두번째 parameter 값을 출력

# print(3 in cabinet) # True
# print(5 in cabinet) # False

cabinet = {'A-3':'유재석', 'B-100':'김태호'}
print(cabinet['A-3'])
print(cabinet['B-100'])

# 새 손님
print(cabinet)
cabinet['A-3'] = '김종국'
cabinet['C-20'] = '조세호'
print(cabinet)

# 손님 떠났을때
del cabinet['A-3']
print(cabinet)

# key만 출력
print(cabinet.keys())

# value만 출력
print(cabinet.values())

# key, value 쌍으로 출력
print(cabinet.items())

# 목욕탕 폐점
cabinet.clear()
print(cabinet)