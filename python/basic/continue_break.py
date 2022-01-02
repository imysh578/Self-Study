absent = [2,5] # 결석
no_book = [7]
for student in range(1, 11):
  if student in absent:
    continue # 다음 코드 실행 안하고 다음 반복문을 실행
  elif student in no_book:
    print(f"오늘 수업은 여기까지. {student}는 교무실로 따라와!")
    break # 다음 코드 실행안하고 반복문을 탈출
  print(f"{student}, 책 읽어봐!")