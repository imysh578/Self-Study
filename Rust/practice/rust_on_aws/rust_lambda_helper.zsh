LAMBDA_ARCH="linux/arm64"
RUST_TARGET="aarch64-unknown-linux-gnu"
RUST_VERSION="latest" # 필요에 따라 특정 버전으로 고정 가능 ex) "1.56.0"
PROJECT_NAME="rust_on_aws"

al2build() {
  docker run --platform ${LAMBDA_ARCH} \
    --rm --user "$(id -u)":"$(id -g)" \
    -v "$PWD":/usr/src/myapp -w /usr/src/myapp rust:${RUST_VERSION} \
    cargo build --release --target ${RUST_TARGET}
}

zipRustLambda() {
  cp ./target/${RUST_TARGET}/release/${PROJECT_NAME} ./bootstrap &&
    zip lambda.zip bootstrap &&
    rm bootstrap
}
