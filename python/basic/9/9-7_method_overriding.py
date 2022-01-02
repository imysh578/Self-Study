# 상속

# 일반 유닛
class Unit:
    def __init__(self, name, hp, speed):  # __init__ : python에서 사용되는 생성자 함수
        # 멤버변수
        self.name = name
        self.hp = hp
        self.speed = speed

    def move(self, location):
        print('[지상 유닛 이동]')
        print(f'{self.name}: {location} 방향으로 이동합니다. [속도 : {self.speed}]')


# 공격 유닛
class AttackUnit(Unit):  # Unit(부모)에게서 상속 받음
    def __init__(self, name, hp, speed, damage):
        Unit.__init__(self, name, hp, speed)
        self.damage = damage

    def attack(self, location):
        print(f'{self.name}: {location} 방향으로 적군을 공격합니다. [공격력 {self.damage}]')

    def damaged(self, damage):
        print(f'{self.name} : {damage} 데미지를 입었습니다.')
        self.hp -= damage
        print(f'{self.name}: 현재 체력은 {self.hp}입니다.')
        if self.hp <= 0:
            print(f'{self.name}: 파괴되었습니다.')


class Flyable:
    def __init__(self, flying_speed):
        self.flying_speed = flying_speed

    def fly(self, name, location):
        print(f"{name},: {location} 방향으로 날아갑니다. [속도 : {self.flying_speed}]")


# 다중 상속
class FlyableAttackUnit(AttackUnit, Flyable):
    def __init__(self, name, hp, damage, flying_speed,):
        AttackUnit.__init__(self, name, hp, 0, damage)  # 지상 스피드 : 0
        Flyable.__init__(self, flying_speed)

    def move(self, location):
        print('[공중 유닛 이동]')
        self.fly(self.name, location)


vulture = AttackUnit('벌쳐', 80, 10, 20)
battleCruiser = FlyableAttackUnit('배틀크루저', 500, 25, 3)

vulture.move('11시')
# battleCruiser.fly(battleCruiser.name, '9시')
battleCruiser.move('9시')
