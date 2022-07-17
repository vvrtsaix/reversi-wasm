use std::{collections::HashMap, fmt::Display, ops::Add};

#[derive(Debug, Hash, PartialEq, Eq, Clone, Copy)]
pub struct Position(pub isize, pub isize);

impl Add for Position {
    type Output = Position;
    fn add(self, rhs: Self) -> Self::Output {
        Position(self.0 + rhs.0, self.1 + rhs.1)
    }
}

impl Display for Position {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[{}, {}]", self.0, self.1)?;
        Ok(())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Side {
    Dark,
    White,
}

impl Side {
    pub fn rev(&self) -> Self {
        match self {
            Side::White => Side::Dark,
            Side::Dark => Side::White,
        }
    }
}

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

#[derive(Debug)]
pub struct Reversi {
    width: isize,
    height: isize,
    active_side: Side,
    disks: HashMap<Position, Side>,
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

    pub fn place(&mut self, pos: Position) -> Result<(), String> {
        if !self.in_board(pos) || self.disks.contains_key(&pos) {
            return Err(String::from(
                "Position isn't in board or another disk already placed.",
            ));
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
            let pos_str = pos.to_string();
            return Err(format!("This position ({pos_str}) hasn't valid line."));
        }

        for flip in flips {
            self.disks.insert(flip, self.active_side);
        }
        self.active_side = other_side;
        Ok(())
    }
}
