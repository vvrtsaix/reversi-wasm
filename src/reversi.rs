pub mod position;
pub mod score;
pub mod side;
use std::collections::HashMap;

use position::Position;
use score::Score;
use side::Side;

static DIRECTIONS: [Position; 8] = [
    Position(-1, -1), // Northwest
    Position(-1, 0),  // North
    Position(-1, 1),  // Northeast
    Position(0, 1),   // East
    Position(1, 1),   // Southeast
    Position(1, 0),   // South
    Position(1, -1),  // Southwest
    Position(0, -1),  // West
];

#[derive(Debug, PartialEq)]
pub struct Reversi {
    pub width: isize,
    pub height: isize,
    pub active_side: Side,
    pub disks: HashMap<Position, Side>,
}

impl Reversi {
    pub fn new(width: isize, height: isize) -> Self {
        Reversi {
            width,
            height,
            active_side: Side::Dark,
            disks: HashMap::from([
                (Position(height / 2, width / 2), Side::White),
                (Position((height / 2) + 1, (width / 2) + 1), Side::White),
                (Position(height / 2, (width / 2) + 1), Side::Dark),
                (Position((height / 2) + 1, width / 2), Side::Dark),
            ]),
        }
    }

    fn in_board(&self, Position(r, c): Position) -> bool {
        r > 0 && r <= self.height && c > 0 && c <= self.width
    }

    fn is_valid_place(&self, pos: Position) -> bool {
        if !self.in_board(pos) || self.disks.contains_key(&pos) {
            return false;
        }

        let other_side = self.active_side.rev();

        for dir in DIRECTIONS {
            let mut _current_pos = pos + dir;
            if self.in_board(_current_pos) && self.disks.get(&_current_pos) == Some(&other_side) {
                _current_pos = _current_pos + dir;
                if !self.in_board(_current_pos) {
                    continue;
                }
                while self.disks.get(&_current_pos) == Some(&other_side) {
                    _current_pos = _current_pos + dir;
                    if !self.in_board(_current_pos) {
                        break;
                    }
                }
                if !self.in_board(_current_pos) {
                    continue;
                }
                if self.disks.get(&_current_pos) == Some(&self.active_side) {
                    return true;
                }
            }
        }

        false
    }

    pub fn possible_places(&self) -> Vec<Position> {
        let mut moves = vec![];
        for row in 1..=self.height {
            for col in 1..=self.width {
                let pos = Position(row, col);
                if self.is_valid_place(pos) {
                    moves.push(pos);
                }
            }
        }
        moves
    }

    pub fn get_scores(&self) -> Score {
        self.disks.iter().fold(Score(0, 0), |mut acc, (_, side)| {
            match side {
                Side::White => acc.0 += 1,
                Side::Dark => acc.1 += 1,
            }
            acc
        })
    }

    pub fn place(&mut self, pos: Position) -> Result<(), &'static str> {
        if !self.in_board(pos) || self.disks.contains_key(&pos) {
            return Err("Position isn't in board or another disk already placed.");
        }

        let other_side = self.active_side.rev();
        let mut flips = vec![pos];

        for dir in DIRECTIONS {
            let mut _current_pos = pos + dir;
            let mut _tmp_flips = vec![];
            if self.in_board(_current_pos) && self.disks.get(&_current_pos) == Some(&other_side) {
                _tmp_flips.push(_current_pos);
                _current_pos = _current_pos + dir;
                if !self.in_board(_current_pos) {
                    continue;
                }
                _tmp_flips.push(_current_pos);
                while self.disks.get(&_current_pos) == Some(&other_side) {
                    _current_pos = _current_pos + dir;
                    if !self.in_board(_current_pos) {
                        break;
                    }
                    _tmp_flips.push(_current_pos);
                }
                if !self.in_board(_current_pos) {
                    continue;
                }
                if self.disks.get(&_current_pos) == Some(&self.active_side) {
                    flips.append(&mut _tmp_flips);
                }
            }
        }

        if flips.len() == 1 {
            return Err("This position hasn't valid line.");
        }

        for flip in flips {
            self.disks.insert(flip, self.active_side);
        }

        self.active_side = other_side;

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use crate::reversi::position::Position;
    use crate::reversi::Reversi;

    #[test]
    fn reverci() {
        let mut instance = Reversi::new(8, 8);
        println!("Possible places: {:?}", instance.possible_places());
        if let Err(msg) = instance.place(Position(3, 4)) {
            println!("{}", msg)
        }
        if let Err(msg) = instance.place(Position(5, 3)) {
            println!("{}", msg)
        }
        if let Err(msg) = instance.place(Position(6, 2)) {
            println!("{}", msg)
        }
        println!("Possible places: {:?}", instance.possible_places());
        println!("Get scores: {}", instance.get_scores());
        println!("{:#?}", instance);
    }
}
