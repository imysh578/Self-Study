# What is Ownership?

- Ownership: a set of rules that govern how a Rust program manages memory

- Memory management
  - In other languages
    - garbage collection
    - explicitly allocate and free the memory
  - Rust
    - manages the memory through a system of ownerhsip with a set of rules that the compiler checks.
    - If any of the rules are violated, the program won't compile.

> NOTE: The **Stack** and the **Heap**
>
> 1. **Stack**
>
> - LIFO(Last In, First Out)
> - pushing: adding data
> - popping: removing data
> - stores fixed size data
>
> 2. **Heap**
>
> - stores data that has unkown size at complie itme and the size might change
> - When we put data on the heap, we request a certain amount of space.
> - _allocating on the heap_: The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a _pointer_, which is the address of that location.
>   <br>
> - Pushing to the stack is faster than allocating on the heap because the allocator never has to search for a place to store new data; the location is always at the top of the stack.
> - Accessing data in the heap is slower than accessing data on the stack because you have to follow a pointer to get there.
>   <br>
> - When the code calls a function, the values passed into the function (including, potentially, pointers to data on the heap), and the function's local variables get pushed onto the stack.
> - When the function is over, those values get popped off the stack.
>   <br>
> - So we need to do..
>   - Keeping the track of what parts of code are using what data on the heap
>   - minimizing the amount of duplicate data on the heap
>   - cleaning up unused data on the heap so we don't run out of space
> - Ownership can resolve these problems!

## 1. Ownership Rules

- Each value in Rust has an _owner_.
- There can only be one _owner_ at a time.
- When the owner goes out of scope, the value will be dropped.

## 2. Variable Scope

- The variable `s` refers to **_string literal_**, where the value of the string is hardcoded into the text.

```rust
{                      // s is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward

    // do stuff with s
}                      // this scope is now over, and s is no longer valid
```

## 3. The _String_ Type

- The known size types
  - can be stored on the stack and popped off the stack.
  - are easy to be copied to make a new instance to use same value in a different scope.
- **_String_** is the a great example to look at data that is stored on the heap.

- **_string literals_** are not suitable for every situation, becuase...

  - they are _immutable_.
  - not every string value can be known when we write our code. (e.g., taking user input)

- For these situation, Rust has a second string type, `String`.

```rust
let s = String::from("hello");
```

- This kind of String can be mutated:

```rust
let mut s = String::from("hello");

s.push_str(", world!"); // push_str() appends a literal to a String

println!("{}", s); // This will print `hello, world!`
```

## 4. Memory and Allocation

- **_string literal_**
  - the contents are known at complie time
  - the text is hardcoded directly into the final executable. -> fast, efficient, but immutable
- **_String type_**
  - The memory must be requested from the memory allocator at runtime
  - We need a way of returning this memory to the allocator when we're done with the String
    <br>
- In Rust

  - **`String::from`**: requests the memory
  - **`drop`** function: When goes out of scope, Rust calls `drop` function automatically to return the memory

  ```rust
  fn main() {
    {
      let s = String::from("hello");  // s is valid from this point forward

                                      // do stuff with s
    }                                 // this scope is now over, and s is no longer valid
  }
  ```

## 5. Variables and Data Interacting with Move

- _Integer_

```rust
let x = 5;  // bind the value 5 to x
let y = x;  // make copy of the value of x and bind it to y
            // As a result, x = y = 5
```

- _String_

```rust
let s1 = String::from("hello");
let s2 = s1;
```

<img width="367" alt="image" src="https://user-images.githubusercontent.com/33863016/209625578-17aee9fc-0053-470d-aadf-1ee8dd1c63bb.png">
  
- *String* is made up of 3 parts; ***pointer***, ***length*** and ***capacity***.
  - **pointer**: pointing the memory that holds the contents of the string(stored on the stack)
  - **length**(bytes): how much memory the contents of the String are currently using.
  - **capacity**(bytes): the total amount of the memory that the string has received from the allocator.

- When we assign s1 to s2, the String data is copied, meaning we copy the pointer, the length, and the capacity.

- The representation is **_NOT_** look like the below picture.
- If Rust copied heap data as well like the below picture, the operation `s2 = s1` could be very expensive in terms of runtime performance.
  <img width="368" alt="image" src="https://user-images.githubusercontent.com/33863016/209625517-e576b4a9-065e-44b2-8901-0a12d8010abf.png">

<br>

### double free error

- When `s1` and `s2` go out of scope, they will both try to free the same memory.
- Freeing the memory twice can lead to memory corruption, which can potentially lead to security vulnerabilities.
- To ensure memory safety, after the line `let s2 = s1;`, Rust considers `s1` as no longer valid.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);
}
```

### shallow copy and deep copy in other languages

- **shallow copy**: copying the pointer, length, and capacity without copying the data
- **deep copy**: copying the pointer, length, and capacity including the data

- In Rust,
  - invalidates the first variable, instead of being shallow copy
  - it's known as a **_move_**
  - `s1` was moved into `s2`
  - **NEVER** automatically create **_deep copies_** of the data
    <img width="368" alt="image" src="https://user-images.githubusercontent.com/33863016/209628304-1cbf2253-f9e9-4dff-8543-31fbd8880d6d.png">

## 6. Variables and Data Interacting with Clone

- `clone` method: deep copy the heap data

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);
}
```

## 7. Stack-Only Data: Copy


```rust
fn main() {
    let x = 5;
    let y = x;

    println!("x = {}, y = {}", x, y);
}
```
- In this case, `x` is still valid and wasn't moved into `y`.
- Because the types such as integers have a known size at complie time and are stored entirely on the stack.

### Copy trait
- A `trait` is like interface in other languages.
- **Copy trait**
  - We can place on types that are stored on the stack, as integer are.
  - If a type implements the **Copy trait**, variables do not move, but rather are trivially copied, making them still valid after assignment to another variables.
  - Can not annotate a type with **Copy** if the type, or any of its prats, has implemented **Drop trait**

- The types that can implement **Copy**
  - All the integer types (e.g., `u32`)
  - The Boolean type (`bool`)
  - All the floating-point types (e.g., `f64`)
  - The character type (`char`)
  - Tuples containing types that implement **Copy** (e.g., `(i32, i32)`, ~~`(i32, String)`~~)


## 8. Ownership and Functions
- The mechanics of passing a value to a function are similar to those when assigning a value to a variable.

```rust
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope

    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it's okay to still
                                    // use x afterward

} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.

```

- If trying to use `s` after the call to `takes_ownership`, a complie-time error would occurs.

## 9. Return Values and Scope
- Returning values can also transfer ownership.

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership moves its return
                                        // value into s1

    let s2 = String::from("hello");     // s2 comes into scope

    let s3 = takes_and_gives_back(s2);  // s2 is moved into
                                        // takes_and_gives_back, which also
                                        // moves its return value into s3
} // Here, s3 goes out of scope and is dropped. s2 was moved, so nothing
  // happens. s1 goes out of scope and is dropped.

fn gives_ownership() -> String {             // gives_ownership will move its
                                             // return value into the function
                                             // that calls it

    let some_string = String::from("yours"); // some_string comes into scope

    some_string                              // some_string is returned and
                                             // moves out to the calling
                                             // function
}

// This function takes a String and returns one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
                                                      // scope

    a_string  // a_string is returned and moves out to the calling function
}
```

- Using tuple to return multiple values
```rust
fn main() {
    let s1 = String::from("hello");

    let (s2, len) = calculate_length(s1);

    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() returns the length of a String

    (s, length)
}

```