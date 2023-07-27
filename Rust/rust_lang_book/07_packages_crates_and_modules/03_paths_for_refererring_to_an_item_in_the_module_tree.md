# Paths for Referring to an Item in the Module Tree
To call a function, we need to know its path. It's like filesystem path.
- e.g., `crate::front_of_house::hosting::add_to_waitlist();` =~ `/front_of_ouse/hosting/add_to_waitlist/`
- Using `crate` is like using `/` to start from the filesystem root in the shell.

A path can take two forms:
- An ***absolute path*** is the full path starting from a crate root
  - for code from external crate, the absolute path begins with the crate name
  - for code from the current crate, it starts with literal `crate`
- A ***relative path*** starts from the current module and uses `self`, `super`, or an identifier in the current module.
Both absolute and relative paths are followed by one or more identifiers separated by double colons(`::`).

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}

// Compile error occurs
```
- All items(functions, methods, structs, enums, modules, and constants) are private to parent modules by default. 
=> If you want make an item private, put it in a module.

- But, items in child modules can use the items in their ancestor modules.

## Exposing Paths with the pub Keyword
Let's mark the `hosing` module with the `pub` keyword to allow the parent module to access to the `add_to_waitlist`.
```rust
mod front_of_house {
    pub mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
// Compile error occurs
```
If we can access to the `front_of_house` module, we can access `hosting` module. But the contents of `hosting` are still private.
- Making the module public doesn't make its content public!
- The `pub` keyword on a module only lets code in its ancestor modules refer to it, not access its inner code.
- Because modules are containers, there's not much we can do only making the module public.
- We need to go further and choose to make one or more of the items within the module public as well.

Let's also make the `add_to_waitlist` function public by adding the `pub` keyword before its definition.
```rust 
mod front_of_house {
    pub mod hosting {
        mod fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}

// No error when compiling!
```

In order to share the library crates, refer to public [API guidelines](https://rust-lang.github.io/api-guidelines/)

> Best Practices for Packages with a Binary and a Library
Typically, packages containing both a binary and a library crate will have just enough code in the binary crate to start an executable that calls codes with the library crate.
This let's other projects benefit from the most functionality that the package provides, because library crate's code can be shared. <br/>
The module tree should be defined in *src/lib.rs*. Then, any public items can be used in the binary crate by starting paths with the name of the package. The binary crate becomes a user of the library crate just like a completely external crate would use the library crate: it can be used the public API.

## Starting Relative Paths with `super`
We can construct relative paths that begin in the parent module by using `super` at the start of the paths.
- similar to `..` in a filesystem path

```rust
fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}
```

## Making Structs and Enums Public
### structs
There are a few details extra to the usage of `pub` with structs and enums.
- We need to make struct's each field public or not on a case-by-case basis. 
  - only `pub struct`: its fields are still private.
```rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // Order a breakfast in the summer with Rye toast
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // Change our mind about what bread we'd like
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // The next line won't compile if we uncomment it; we're not allowed
    // to see or modify the seasonal fruit that comes with the meal
    // meal.seasonal_fruit = String::from("blueberries");
}
```

- Because `back_of_house::Breakfast` struct has a private field, the struct needs to provide a public associated function that constructs an instance of `Breakfast` (`summer` function here).
  - If `Breakfast` didn't have such a function, we couldn't create an instance of `Breakfast` in `eat_at_restaurant`, because we couldn't set the value of the private `seasonal_fruit` field in `eat_at_restaurant`.


### enums
If we make an *enum* public, all of its variants are then public.
- The enum variants are public by default.

```rust 
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```


## Absolute vs. Relative, which one should we use?
It depends on whether we're more likely to move item definition code separately from or together with the code that uses the item.
For examples,
- If we move the `front_of_house` module and the `eat_at_restaurant` function into a module named `customer_experience`, we'd need to update the **absolute path** to `add_to_waitlist`, but the **relative path** would still be valid.
```rust
mod customer_experience {
    mod front_of_house {
        pub mod hosting {
            pub fn add_to_waitlist() {}
        }
    }

    pub fn eat_at_restaurant() {
        // Absolute path
        crate::customer_experience::front_of_house::hosting::add_to_waitlist(); // changed

        // Relative path
        front_of_house::hosting::add_to_waitlist();
    }
}
```

- If we moved the `eat_at_restaurant` function separately into a module named `dinning`, the absolute path to the `add_to_waitlist` call would stay the same, but the relative path would need to be updated.
```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

mod dinning {
    pub fn eat_at_restaurant() {
        // Absolute path
        crate::front_of_house::hosting::add_to_waitlist();

        // Relative path
        super::front_of_house::hosting::add_to_waitlist(); // changed
    }
}
```