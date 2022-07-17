mod reversi;

#[cfg(test)]
mod tests {
    use crate::reversi::{Position, Reversi};
    #[test]
    fn reverci() {
        let mut instance = Reversi::new(8, 8);
        if let Err(msg) = instance.place(Position(3, 4)) {
            println!("{}", msg)
        }
        if let Err(msg) = instance.place(Position(5, 3)) {
            println!("{}", msg)
        }
        if let Err(msg) = instance.place(Position(6, 2)) {
            println!("{}", msg)
        }
        if let Err(msg) = instance.place(Position(8, 8)) {
            println!("{}", msg)
        }
        println!("{:#?}", instance);
    }
}
