use std::fs::File;
fn main() {
    let greeting_file = File::open("hello1.txt")?;
}