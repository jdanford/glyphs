# Glyphs

A two-dimensional pictorial language in the browser, sort of like [Befunge](https://esolangs.org/wiki/Befunge) but prettier. It has minimal external dependencies but *does* require a browser that supports [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).

## Development

Prerequisites:
- Make
- TypeScript >= 2.0
- [http-server] (optional)

If you have [http-server] installed, run `make serve` and open the URL it gives you, otherwise use your favorite HTTP server.

## Usage (in app)

Click on a glyph (or empty cell) to change it. Click the question mark button to view documentation and examples.

## Future improvements

### External
- Use good UI design (no `window.prompt`)
- Add more examples
- Add more glyphs
- Make a better favicon

### Internal
- Move program encoding/decoding to separate module
- Move hash fragment handling out of GlyphEditor
- Expose better interface for glyph `effect` functions
- Make CSS more modular

## Attributions 💖

- [Font Awesome](http://fontawesome.io/) by Dave Gandy
- [Olical/EventEmitter](https://github.com/Olical/EventEmitter)
- [nfriend/ts-keycode-enum](https://github.com/nfriend/ts-keycode-enum)

[http-server]: https://github.com/indexzero/http-server
