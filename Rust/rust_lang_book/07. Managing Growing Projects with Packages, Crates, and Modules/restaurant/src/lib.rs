// /* pub */
// pub mod front_of_house {
//     const DAMON: i32 = 1;
//     pub mod hosting {
//         use crate::front_of_house::DAMON;
//         pub fn add_to_waitlist() {
//             println!("{}", DAMON);
//         }
//     }
// }

// pub fn eat_at_restaurant() {
//     // Absolute path
//     crate::front_of_house::hosting::add_to_waitlist();

//     // Relative path
//     front_of_house::hosting::add_to_waitlist();
// }

// /* Absolute vs. Relative */
// //1.
// mod customer_experience {
//     mod front_of_house {
//         pub mod hosting {
//             pub fn add_to_waitlist() {}
//         }
//     }

//     pub fn eat_at_restaurant() {
//         // Absolute path
//         crate::customer_experience::front_of_house::hosting::add_to_waitlist(); // changed

//         // Relative path
//         front_of_house::hosting::add_to_waitlist();
//     }
// }

// //2.
// mod front_of_house {
//     pub mod hosting {
//         pub fn add_to_waitlist() {}
//     }
// }

// mod dinning {
//     pub fn eat_at_restaurant() {
//         // Absolute path
//         crate::front_of_house::hosting::add_to_waitlist();

//         // Relative path
//         super::front_of_house::hosting::add_to_waitlist();
//     }
// }

// /* super */
// fn deliver_order() {}

// mod back_of_house {
//     fn fix_incorrect_order() {
//         cook_order();
//         super::deliver_order(); // ../deliver_order
//     }

//     fn cook_order() {}
// }


// /* public struct */
// mod back_of_house {
//     pub struct Breakfast {
//         pub toast: String,
//         seasonal_fruit: String,
//     }

//     impl Breakfast {
//         pub fn summer(toast: &str) -> Breakfast {
//             Breakfast {
//                 toast: String::from(toast),
//                 seasonal_fruit: String::from("peaches"),
//             }
//         }
//     }
// }

// pub fn eat_at_restaurant() {
//     let mut meal = back_of_house::Breakfast::summer("Rye");
//     meal.toast = String::from("Wheat");
//     println!("I'd like {} toast please.", meal.toast);
//     // meal.seasonal_fruit = String::from("blueberries"); // cannot change a private field!
//     // println!("fruit: {}", meal.seasonal_fruit);
// }


// /* public enum */
// mod back_of_house {
//     #[derive(Debug)]
//     pub enum Appetizer {
//         Soup,
//         Salad,
//     }
// }

// pub fn eat_at_restaurant() {
//     let order1 = back_of_house::Appetizer::Soup;
//     let order2 = back_of_house::Appetizer::Salad;

//     println!("order1: {:?}", order1);
//     println!("order2: {:?}", order2);
// }

/* use for functions*/
// mod front_of_house {
//     pub mod hosting {
//         pub fn add_to_waitlist() {}
//     }
// }

// use crate::front_of_house::hosting;

// pub fn eat_at_restaurant() {
//     hosting::add_to_waitlist();
// }