# Glyphs

A two-dimensional pictorial language in the browser, sort of like [Befunge](https://esolangs.org/wiki/Befunge) but prettier. It has minimal external dependencies but *does* require a browser that supports [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).

## Development

Prerequisites:
- Make
- TypeScript >= 2.0
- [http-server] (optional)

If you have [http-server] installed, run `make serve` and open the URL it gives you, otherwise use your favorite HTTP server.

## Usage (in app)

Click the question mark button to view documentation and examples.

## Future improvements

### External
- Add input to console (no more `window.prompt`)
- Add more examples
- Add more glyphs
- Make UI scale better with font size
- Make a better favicon

### Internal
- Move program encoding/decoding to separate module

## Attributions 💖

- [Font Awesome](http://fontawesome.io/) by Dave Gandy
- [Olical/EventEmitter](https://github.com/Olical/EventEmitter)
- [nfriend/ts-keycode-enum](https://github.com/nfriend/ts-keycode-enum)

[http-server]: https://github.com/indexzero/http-server
