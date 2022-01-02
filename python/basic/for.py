# for waiting_num in range(1,6):
#   print(f"대기번호 : {waiting_num}")

# starbucks = ['Iron Man', 'Thor', "Groot"]

# for customer in starbucks:
#   print(f'{customer}님, 커피가 준비되었습니다.')

# # 한 줄 for
# # 출석 번호가 1 2 3 4, 앞에 100을 붙이기로 함 -> 101, 102, 103, 104
# students = list(range(1,6))
# print(students)
# students = [student+100 for student in students]
# print(students)

# # 학생 이름을 길이로 변환
# students = ['Iron man', 'Thor', 'I am groot']
# students = [len(student) for student in students]
# print(students)

# 학생 이름 대문자로 변환
students = ['Iron man', 'Thor', 'I am groot']
students = [student.upper() for student in students]
print(students)

