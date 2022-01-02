# # sep : seperator로 출력값을 구분짓는 표현을 지정, end: 다음 print 출력을 연달아서 출력
# print('Python', 'Java', sep=', ', end='?')
# print('무엇이 더 재밌을까요?')

# import sys
# print('Python', 'Java', file=sys.stdout)
# print('Python', 'Java', file=sys.stderr)

# # 시험 성적
# scores = {'수학': 0, '영어': 50, '코딩': 100}
# for subject, score in scores.items():
#     # print(subject, score)
#     print(subject.ljust(8), str(score).rjust(4), sep=':')

# # 은행 대기 순번표
# # 001, 002, 003, ...
# for num in range(1, 21):
#     print('대기번호 : '+str(num).zfill(3))

answer = input('아무 값이나 입력하세요 : ')
print(type(answer))  # 입력값이 숫자여도 str로 인식
print(f'입력하신 값은 {answer}입니다.')
