use std::fs::File;
main() {
    let greeting_file = File::open("hello1.txt")?;
}