import pickle
# # w: write, b: binary, pickle에서는 encoding을 따로 해줄 필요 없음
# profile_file = open('profile.pickle', 'wb')
# profile = {'이름': '박명수', '나이': 30, '취미': ['축구', '크로스핏', '코딩']}
# print(profile)
# pickle.dump(profile, profile_file)  # profile에 있는 정보를 file에 저장
# profile_file.close()

profile_file = open('profile.pickle', 'rb')
profile = pickle.load(profile_file)  # file에 있는 정보를 profile에 불러오기
print(profile)
profile_file.close()
