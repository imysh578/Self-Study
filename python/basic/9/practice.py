class Unit:
    def __init__(self):
        print('Unit 생성자')


class Flyable:
    def __init__(self):
        print("Flyable 생성자")


# 두개 이상의 다중 상속 시
class FlyableUnit(Unit, Flyable):
    def __init__(self):
        # super().__init__()  # 먼저 상속 받은 생성자를 가져옴(Unit)
        Unit.__init__(self)
        Flyable.__init__(self)


dropship = FlyableUnit()
