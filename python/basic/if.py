# weather = input('오늘 날씨는 어때요? ')
# if weather == '비':
#   print('우산을 챙기세요')
# elif weather == '미세먼지':
#   print('마스크를 챙기세요')
# else:
#   print('준비물 필요 없어요')

temper = int(input('기온은 어때요? '))
if temper > 30 :
  print('폭염 주의보! 실내에 대기하세요')
elif 30> temper >= 10 : 
  print('외출하기 좋은 날씨에요!')
elif 10 > temper >= 0 :
  print('외출시 외투를 챙기세요')
else:
  print('한파 주의보! 외출을 자제하세요') 