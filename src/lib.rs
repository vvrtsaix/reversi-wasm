use js_sys::Reflect;
use reversi::Reversi;
use wasm_bindgen::JsValue;
use wasm_react::{
    c,
    callback::Callable,
    export_components, h,
    hooks::{use_callback, use_state, Deps},
    props::Style,
    Component,
};

use crate::reversi::position::Position;

mod reversi;

pub struct App {
    size: isize,
}

impl TryFrom<JsValue> for App {
    type Error = JsValue;

    fn try_from(value: JsValue) -> Result<Self, Self::Error> {
        Ok(App {
            size: Reflect::get(&value, &"size".into())?
                .as_f64()
                .unwrap_or(8.0) as isize,
        })
    }
}

impl Component for App {
    fn render(&self) -> wasm_react::VNode {
        let error_msg = use_state(|| "");
        let instance = use_state(|| Reversi::new(self.size, self.size));
        let scores = use_state(|| instance.value().get_scores());
        let possible_places = use_state(|| instance.value().possible_places());

        let handle_move = use_callback(
            {
                let instance = instance.clone();
                let scores = scores.clone();
                let error_msg = error_msg.clone();
                let possible_places = possible_places.clone();

                move |pos: Position| {
                    use_callback(
                        {
                            let mut scores = scores.clone();
                            let mut instance = instance.clone();
                            let mut error_msg = error_msg.clone();
                            let mut possible_places = possible_places.clone();
                            move |_| {
                                error_msg.set(|_| "");
                                instance.set(|mut i| {
                                    i.place(pos).unwrap_or_else(|e| error_msg.set(|_| e.into()));
                                    scores.set(|_| i.get_scores());
                                    possible_places.set(|_| i.possible_places());
                                    i
                                });
                            }
                        },
                        Deps::none(),
                    )
                }
            },
            Deps::none(),
        );

        h!(div).build(c![
            h!(h1).build(c!["Reversi"]),
            h!(p)
                .style(&Style::new().margin("0 0 1rem 0"))
                .build(c![instance.value().active_side.to_owned().to_string(), "'s turn"]),
            h!(p)
                .style(&Style::new().margin("0 0 1rem 0"))
                .build(c![scores.value().to_owned().to_string()]),
            h!(table).build(c![h!(tbody).build(c![..(1..=instance.value().height)
                .map(|row| {
                    h!(tr)
                        .key(Some(format!("row_{}", row)))
                        .build(c![..(1..=instance.value().width).map(|col| {
                            let pos = Position(row, col);
                            h!(td)
                                .on_click(&handle_move.call(pos))
                                .key(Some(format!("col_{}", col)))
                                .build(c![{
                                    match instance.value().disks.get(&pos) {
                                        Some(side) => match side {
                                            reversi::side::Side::Dark => "⚫",
                                            reversi::side::Side::White => "⚪",
                                        },
                                        None => match possible_places.value().contains(&pos) {
                                            true => "*",
                                            false => " ",
                                        },
                                    }
                                }])
                        })])
                })])]),
            h!(p)
                .style(&Style::new().color("red").margin("1rem 0 0 0"))
                .build(c![*error_msg.value()]),
        ])
    }
}

export_components! { App }
