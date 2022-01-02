# # 마린
# name = '마린'
# hp = 40
# damage = 5

# print(f"{name} 유닛이 생성되었습니다.")
# print(f'체력 {hp}, 공격력 {damage}\n')

# # 시즈탱크
# tank_name = '탱크'
# tank_hp = 150
# tank_damage = 35

# print(f"{tank_name} 유닛이 생성되었습니다.")
# print(f'체력 {tank_hp}, 공격력 {tank_damage}\n')


# def attack(name, loaction, damage):
#     print(f'{name}: {loaction} 방향으로 공격을 진행합니다. [공격력 {damage}]')


# attack(name, '1시', damage)
# attack(tank_name, '1시', tank_damage)


class Unit:
    def __init__(self, name, hp, damage):  # __init__ : python에서 사용되는 생성자 함수
        # 멤버변수
        self.name = name
        self.hp = hp
        self.damage = damage
        print(f'{name} 유닛이 생성 되었습니다.')
        print(f'체력 {hp}, 공격력 {damage}')


# # marine1, 2, tank는 객체(class로 부터 만들어지는 것)
# # Unit 클래스의 인스턴스라고도 함
# marine1 = Unit('마린', 40, 5)
# marine2 = Unit('마린', 40, 5)
# tank = Unit('탱크', 150, 35)

# wraith1 = Unit('레이스', 80, 5)
# print(f'유닛 이름: {wraith1.name}, 공격력: {wraith1.damage}')

# wraith2 = Unit('빼앗은 레이스', 80, 5)
# wraith2.cloaking = True  # 외부에서 cloacking이라는 객체의 변수를 추가하여 사용할 수 있음, 하지만 다른 객체에는 없음!

# if wraith2.cloaking == True:
#     print(f'{wraith2.name}는 현재 클로킹 상태입니다.')

# 함수도 클래스 안에 넣을 수 있음
class AttackUnit:
    def __init__(self, name, hp, damage):
        self.name = name
        self.hp = hp
        self.damage = damage

    def attack(self, location):
        print(f'{self.name}: {location} 방향으로 적군을 공격합니다. [공격력 {self.damage}]')

    def damaged(self, damage):
        print(f'{self.name} : {damage} 데미지를 입었습니다.')
        self.hp -= damage
        print(f'{self.name}: 현재 체력은 {self.hp}입니다.')
        if self.hp <= 0:
            print(f'{self.name}: 파괴되었습니다.')


firebat1 = AttackUnit('파이어뱃', 50, 16)
firebat1.attack('5시')
firebat1.damaged(25)
firebat1.damaged(25)
