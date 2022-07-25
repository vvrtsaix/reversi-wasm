use std::{fmt::Display, ops::Add};

#[derive(Debug, Hash, PartialEq, Eq, Clone, Copy)]
pub struct Score(pub isize, pub isize);

impl Add for Score {
    type Output = Score;
    fn add(self, rhs: Self) -> Self::Output {
        Score(self.0 + rhs.0, self.1 + rhs.1)
    }
}

impl Display for Score {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[White: {}, Dark: {}]", self.0, self.1)?;
        Ok(())
    }
}
