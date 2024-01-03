# 14.1 Customizing Builds with Release Profiles

## Release Profiles
코드 컴파일에 관련된 여러가지 옵션을 제어할 수 있는 프로필
커스텀이 가능함

Cargo는 두가지 메인 프로필이 존재
1. `dev` profile
2. `release` profile

### 1. `dev` profile
개발을 위한 기본 설정이 되어 있음 
```sh
$ cargo build
    Finished dev [unoptimized + debuginfo] target(s) in 0.0s
```

### 2. release profile
배포를 위한 위한 기본 설정이 되어 있음
```sh
$ cargo build --release
    Finished release [optimized] target(s) in 0.0s
```

## How to apply defaults of profiles
***Cargo.toml***에서 각 프로필에 대한 기본 설정을 적용할 수 있음

**예시**
Filename: Cargo.toml
```
# 모든 프로필
[profile.*]
opt-level = 2

# 개발용 프로필
[profile.dev]
opt-level = 0

# 배포용 프로필
[profile.release]
opt-level = 3

```
- opt-level: 최적화 단계를 0~3으로 설정 (낮을수록 컴파일은 빠르지만 코드의 길이가 길다: dev에 적합)


