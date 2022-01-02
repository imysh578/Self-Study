# # 파일 생성 및 쓰기
# score_file = open('score.txt', 'w', encoding='utf8')  # utf8 : 한글 표현
# print('수학: 0', file=score_file)
# print('영어: 50', file=score_file)
# score_file.close()

# score_file = open('score.txt', 'a', encoding='utf8')  # a: append
# score_file.write('과학: 80')
# score_file.write('\n코딩: 100')
# score_file.close()

# # 파일 불러오기
# score_file = open('score.txt', 'r', encoding='utf8') # r: read, 파일 읽기
# print(score_file.read())
# score_file.close()

# score_file = open('score.txt', 'r', encoding='utf8')
# print(score_file.readline(), end="")  # 줄별로 읽기, 한 줄 읽고 커서는 다음 줄로 이동
# print(score_file.readline(), end="")
# print(score_file.readline(), end="")
# print(score_file.readline(), end="")
# score_file.close()

# # 파일 내용이 몇 줄인지 모를때
# score_file = open('score.txt', 'r', encoding='utf8')
# while True:
#     line = score_file.readline()
#     if not line:
#         break
#     print(line, end='')
# score_file.close()

# list에 값을 넣어서 처리하는 방법
score_file = open('score.txt', 'r', encoding='utf8')
lines = score_file.readlines()  # list 형태로 저장
for line in lines:
    print(line, end='')

score_file.close()
