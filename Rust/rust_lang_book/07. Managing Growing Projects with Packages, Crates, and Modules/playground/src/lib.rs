pub mod front_of_house;

pub mod back_of_house {
  pub fn ready_to_serve() {}
}

pub use crate::front_of_house::hosting::add_to_waitlist;
pub use crate::back_of_house::ready_to_serve;

pub fn eat_at_restaurant() {
  add_to_waitlist();
}