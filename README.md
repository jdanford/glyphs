# Glyphs

A two-dimensional pictorial language in the browser, sort of like [Befunge](https://esolangs.org/wiki/Befunge) but prettier.

## Development

Prerequisites:
- Make
- TypeScript >= 2.0
- [http-server] (optional)

Either serve the root directory yourself, or if you have [http-server] installed, run `make serve` and open the URL it gives you.

## Usage

The current program is stored in the hash fragment of the URL, allowing for easy sharing and undo/redo. There's a help button with a question mark on it that has example programs and more documentation.

## Future improvements

- Use good UI design (no `window.prompt`)
- Add more glyphs
- Expose better interface for glyph `effect` functions
- Make CSS more modular
- Move program encoding/decoding to separate module
- Move hash fragment handling out of GlyphGrid

## Attributions 💖

- [Font Awesome by Dave Gandy](http://fontawesome.io/)
- [Olical/EventEmitter](https://github.com/Olical/EventEmitter)
- [nfriend/ts-keycode-enum](https://github.com/nfriend/ts-keycode-enum)

[http-server]: https://github.com/indexzero/http-server
