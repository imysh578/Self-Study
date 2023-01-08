fn main() {
    let dice_roll = 11;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(),
        // other => move_player(other),
    }

    fn add_fancy_hat() {
        println!("Add fancy hat");
    }
    fn remove_fancy_hat() {
        println!("Remove fancy hat");
    }
    fn move_player(num_spaces: u8) {
        println!("Move player: {}", num_spaces);
    }
    fn reroll() {
        println!("Reroll!");
    }
}
