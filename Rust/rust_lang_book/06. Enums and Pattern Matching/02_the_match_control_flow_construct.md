# The Match Control Flow Construct
- **`match`**: control flow construct that allows us to compare a value against a series of patterns, and then execute code based on which pattern matches.
- Patterns can be made up of literal values, variable names, wildcards, and many other things.

>NOTE: a bit difference between `if` and `match` -> type of expression (condition)
> - `if`: only Boolean type
> - `match`: any type

<br/>

Example (Coin-sorting machine):
```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin { // it has four arms
        Coin::Penny => 1, // first arm
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

Each `match` arms has two part: ***a pattern*** and ***some code***
- first arm
  - pattern: `Coin::Penny`
  - arrow(`=>`): separates the pattern and the code to run
  - code: `1`
  - comma(`,`): separates from the next arm
- other arms...

When the match expression executes, it compares the resulting values against the pattern of each arm, in order.
- If the pattern matches the value, the code associated with that pattern is executed. 
- If the pattern doesn't match the value, execution continues to the next arm.

The resulting value of the expression in the matching arm is the value that gets returned for the entire `match` expression.

Use curly brackets for the multiple lines of code in a match arm
```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

## 1. Patterns that Bind to Values
The match arms can bind to the parts of the values that match the pattern.

Example:
```rust
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}", state);
            25
        },
    }
}
```

- If we were to call `value_in_cents(Coin::Quarter(UsState::Alaska))`, `coin` would be `Coin::Quarter(UsState::Alaska)`.
- At that point, the binding for `state` will be the value `UsState::Alaska`.


## 2. Matching with Option<T>
Using `match` to get the inner `T` value out of the Some case when using `Option<T>`.

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i+1),
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
}
```
- Combining `match` and enums is useful in many situation.
- ***The pervasive pattern***: match against an enum, bind a variable to the data inside, and then execute code based on it.

## 3. Matches Are Exhaustive
The arms' patterns MUST cover all possibilities
```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x { // doesn't handle None case
            Some(i) => Some(i + 1),
        }
    }

// Compile error occurs!
```
Rust knows that we didn't cover every possible case and even knows which pattern we forgot!

## 4. Catch-all Patterns and the _ Placeholder
Using enums, we can take special actions for a few particular values, but for all other values take one default action.

Example (dice game):

Catch-all Pattern (`other`)
- It covers every other possible value
- This catch-all pattern meets the requirement that `match` must be exhaustive.
- The catch-all arm must be last, because the patterns are evaluated in order; If we put the catch-all arm earlier, the other arm would never run.
```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),ㅔ
        7 => remove_fancy_hat(),
        other => move_player(other), // bind to the value using other
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
```

Placeholder (`_`)
- It is a special pattern that matches any value and does not bind to that value.
- This tells Rust we aren't going to use the value, so Rust won't warn us about an unused variable.
```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(), // doesn't bind to the value
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
```

Placeholder with unit value
- Nothing happens!
```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (), // doesn't bind to the value and nothing happens
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
```