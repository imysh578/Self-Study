# def profile(name, age, main_lang):
#   print(f'이름 : {name}\t나이 : {age}\t주 사용 언어: {main_lang}')

# profile('유재석', 20, 'Python')
# profile('김태호', 25, 'Java')

# 같은 학교, 같은 학년, 같은 반, 같은 수업
def profile(name, age=17, main_lang='Phyton'):  # 매개변수에 값이 주어지지 않으면 해당 default 값을 할당
  print(f'이름 : {name}\t나이 : {age}\t주 사용 언어: {main_lang}')

profile('유재석')
profile('김태호')

def profile(name, age, main_lang):
  print(name, age, main_lang)

profile(name='유재석', main_lang='Python', age=20)
profile(main_lang='Java', age=25, name="김태호")

# 키워드에 값을 할당하면 순서가 뒤바뀌어도 제대로 출력이 된다.