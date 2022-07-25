use std::fmt::Display;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
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

impl Display for Side {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Side::Dark => write!(f, "Dark")?,
            Side::White => write!(f, "White")?,
        }
        Ok(())
    }
}
