# Quiz) 주어진 코드를 활용하여 부동산 프로그램을 작성하시오.

# (출력 예제)
# 총 3대의 매물이 있습니다.
# 강남 아파트 매매 10억 2010년
# 마포 아파트 전세 5억 2007년
# 송파 빌라 월세 500/50 2000년

# [코드]
class Hosue:
    # 매물 초기화
    def __init__(self, location, house_type, deal_type, price, completion_year):
        self.location = location,
        self.house_type = house_type
        self.deal_type = deal_type
        self.price = price
        self.completion_year = completion_year

    # 매물 정보 표시
    def show_detail(self):
        print(self.location, self.house_type, self.deal_type,
              self.price, self.completion_year)


h1 = Hosue('강남', '아파트', '매매', '10억', '2010년')
h2 = Hosue('마포', '아파트', '전세', '5억', '2007년')
h3 = Hosue('송파', '빌라', '월세', '500/50', '2000년')

houses = []
houses.append(h1)
houses.append(h2)
houses.append(h3)

print(f'총 {len(houses)} 대의 매물이 있습니다.')
for house in houses:
    house.show_detail()
