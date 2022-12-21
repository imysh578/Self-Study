# Control Flow

## 1. if Expressions
- `if` expression: branch our code depending on the conditions
```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

- the condition in this code MUST be a `bool`
```rust
fn main() {
    let number = 3;

    if number {
        println!("number was three");
    }
}

// compile error!
```

```rust
fn main() {
    let number = 3;

    if number != 0 {
        println!("number was something other than zero");
    }
}
```

### 1-1. Handling Multiple Conditions with *else if*
```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

### 1-2. Using *if* in a *let* Statement
- We can use it to assign the outcome to a variable.
```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

- What if the types are mismatched?
```rust
fn main() {
    let condition = true;

    let number = if condition { 5 } else { "six" };

    println!("The value of number is: {number}");
}

// Compile error!
```
- Variables MUST have a single type!


## 2. Repetition with Loops
- 3 types of loop: `loop`, `while`, and `for`
### 2-1. Repeating Code with *loop*
- `loop`: execute a block of code forever or until we tell it to stop
```rust
fn main() {
    loop {
        println!("again!");
    }
}

// infinite loop
```

- `break`: stops executing and breaks out of the loop
- `continue`: skips over any remaining code in this iteration of the loop and goes to the next iteration

### 2-2. Returning Values from *loop*
- `loop` can return value.
- We need to add a value after the `break` to return the value
```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2; // return this value
        }
    };

    println!("The result is {result}");
}
```

### 2-3. *Loop Labels* to Disambiguate Between Multiple Loops
- ***loop label***: We use it to apply `break`, `continue` from innermost loop
- loop label MUST begin with single quotes.

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop { // specify a loop label
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up; // break out of the counting_up loop
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```


### 2-4. Conditional Loops with *while*

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}

```

### 2-5. Looping Through a Collection with *for*
- Example of `while`: 
  - Increasing index and print all elements of an array.
```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    let mut index = 0;

    while index < 5 {
        println!("the value is: {}", a[index]);

        index += 1;
    }
}
```
- But, this is error prone; we could cause the program to panic if the index value or test condition is incorrect
- If we removed one of the elements from the array and forgot to edit while condition(`while index < 4`), the code would be panic.

<br>

- As a more concise alternative, we can use a `for` loop.
```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

- We can set a range in `for` loop
```rust
fn main() {
    for number in (1..4).rev() { // rev(): reverse the range
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```