# Reading a File
Now we'll add functionality to read the file specified in the `file_path` argument.

## Create an text file to test
Filename: *poem.txt*
```txt
I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!
```

## Edit *src/main.rs*
```rust
use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    let query = &args[1];
    let file_path = &args[2];

    println!("Searching for {}", query);
    println!("In file {}", file_path);

    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}
```
- `fs::read_to_string(file_path)`: opens the file and returns a `std:io::Result<String>` of the file's contents

Run and result:
```shell
cargo run -- the poem.txt
   Compiling minigrep v0.1.0 (/Users/seokhunyoon/Documents/Github/Self-Study/Rust/rust_lang_book/minigrep)
    Finished dev [unoptimized + debuginfo] target(s) in 0.13s
     Running `target/debug/minigrep the poem.txt`
Searching for the
In file poem.txt
With text:
I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!
```

What we need to fix more?
- `main` function has multiple responsibilities, so split it to multiple functions and each function is responsible for only one idea.
- There are not code for handling errors. 