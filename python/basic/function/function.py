def open_account():
  print('새로운 계좌가 생성되었습니다.')


def deposit(balance, money):
  print(f"입금이 완료되었습니다. 잔액은 {balance + money}원 입니다.")
  return balance+money

def withdraw(balance, money):
  if balance>=money:  # 잔액이 출금 금액보다 많으면
    print(f'출금이 완료되었습니다. 잔액은 {balance - money}원 입니다.')
    return balance-money
  else:
    print('잔액이 부족합니다.')
    return balance

def withdraw_night(balance, money):  # 저녁에 출금
  commission = 100  # 수수료 100원
  return commission, balance-money-commission

balance = 0
balance = deposit(balance, 1000)
balance = withdraw(balance, 300)
commission, balance = withdraw_night(balance, 500)
print('수수료는 {0}원이며, 잔액은 {1}원 입니다.'.format(commission, balance))