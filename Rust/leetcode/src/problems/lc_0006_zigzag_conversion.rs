pub fn convert(s: String, num_rows: i32) -> String {
    if num_rows == 1 || (s.len() as i32) <= num_rows {
        return s;
    }

    let mut rows: Vec<String> = vec![String::new(); num_rows as usize];
    let mut current_row = 0;

    enum Direction {
        Down,
        Up,
    }
    let mut current_direction = Direction::Down;

    for c in s.chars() {
        rows[current_row].push(c);

        match current_direction {
            Direction::Down => {
                current_row += 1;
            }
            Direction::Up => {
                current_row -= 1;
            }
        }

        if current_row >= (num_rows - 1) as usize {
            current_direction = Direction::Up;
        }
        if current_row <= 0 as usize {
            current_direction = Direction::Down;
        }
    }

    rows.concat()
}
