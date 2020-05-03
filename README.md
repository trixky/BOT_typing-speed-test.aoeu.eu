# wpm-bot

A simple typing speed bot on [typing-speed-test.aoeu.eu](https://typing-speed-test.aoeu.eu/), using [node.js](https://nodejs.org/en/) with [puppeteer](https://www.npmjs.com/package/puppeteer).

![Recordit GIF](https://i.ibb.co/TtXrDvv/ezgif-com-video-to-gif.gif  | width=100)

### Requirements

- node  12.16.3
- npm   6.14.4

## Usage

```bash
npm install
npm start
```

### Configuration

You can configure some parameters in the `config.json` file :

- cpm           (delay between each key pressed in ms)
- end_break     (delay to see results in ms)
- width         (screen width)
- height        (screen height)
- first         (scroll to the input)
- second        (scroll to results)
