# Glyphs

A two-dimensional pictorial language in the browser, sort of like [Befunge](https://esolangs.org/wiki/Befunge) but prettier. It has minimal external dependencies but *does* require a browser that supports [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).

## Development

Prerequisites:
- Make
- TypeScript >= 2.0
- [http-server] (optional)

Either serve the root directory yourself, or if you have [http-server] installed, run `make serve` and open the URL it gives you.

## Usage

In the app, the with the question mark on it has a help window with documentation and examples.

## Future improvements

- Expand documentation and examples
- Use good UI design (no `window.prompt`)
- Add more glyphs
- Expose better interface for glyph `effect` functions
- Add speed controls
- Make CSS more modular
- Move program encoding/decoding to separate module
- Move hash fragment handling out of GlyphGrid

## Attributions 💖

- [Font Awesome](http://fontawesome.io/) by Dave Gandy
- [Olical/EventEmitter](https://github.com/Olical/EventEmitter)
- [nfriend/ts-keycode-enum](https://github.com/nfriend/ts-keycode-enum)

[http-server]: https://github.com/indexzero/http-server
