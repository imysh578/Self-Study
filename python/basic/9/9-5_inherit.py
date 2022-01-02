# 상속

# 일반 유닛
class Unit:
    def __init__(self, name, hp):  # __init__ : python에서 사용되는 생성자 함수
        # 멤버변수
        self.name = name
        self.hp = hp


# 공격 유닛
class AttackUnit(Unit):  # Unit(부모)에게서 상속 받음
    def __init__(self, name, hp, damage):
        Unit.__init__(self, name, hp)
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
        AttackUnit.__init__(self, name, hp, damage)
        Flyable.__init__(self, flying_speed)


valkyrie = FlyableAttackUnit('발키리', 200, 6, 5)
valkyrie.fly(valkyrie.name, '3시')
