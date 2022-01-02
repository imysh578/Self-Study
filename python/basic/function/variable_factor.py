# def profile(name, age, lang1, lang2, lang3, lang4, lang5):
#   # end = " "으로 하면 다음 print의 출력이 줄바꿈 없이 이어진다
#   print('이름: {0}\t나이: {1}\t'.format(name, age), end=' ')
#   print(lang1, lang2, lang3, lang4, lang5)


# profile("유재석", 20, 'Phyton', "java",  'C', 'C++', 'C#')
# profile("김태호", 25, "Kotlin", "Swift", "", "","")  # 빈 매개변수에 빈칸을 넣음, 귀찮음..

def profile(name, age, *language):
    # end = " "으로 하면 다음 print의 출력이 줄바꿈 없이 이어진다
    print('이름: {0}\t나이: {1}\t'.format(name, age), end=' ')
    for lang in language:
        print(lang, end=" ")
    print()  # 줄바꿈


profile("유재석", 20, 'Phyton', "java",  'C', 'C++', 'C#', 'JavaScript')
profile("김태호", 25, "Kotlin", "Swift")
