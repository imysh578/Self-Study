### [rand pacakge](1)
- pseudo random package(유사 랜덤함수)
- `rand.Intn(숫자)` : 0 ~ 숫자-1 중 숫자 하나 선택, 실행할 때마다 똑같음...
- `rand.Seed(숫자)` : 입력한 숫자마다 다른 숫자를 보여줌, 동일한 숫자 입력하면 똑같은 결과가 나옴 => 매번 다른 숫자를 넣어줘야 진짜 랜덤! => 현재 시간을 넣어준다! `rand.Seed(time.Now()..UnixNano())`


### [time package](2)
- Time : 시각
- Duration : 시간
- Location : 타임존
