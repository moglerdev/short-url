# short url

> A simple URL shortener by [Christopher Jaeger](https://github.com/moglerdev)


## What is this?

This is a simple URL shortener. It is written in JavaScript and uses [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/).
As a database it uses [Redis](https://redis.io/).

## How to use it?

### Prerequisites

I prefer to use [Docker](https://www.docker.com/) to run this application. If you don't have it installed, you can find the installation instructions [here](https://docs.docker.com/get-docker/).
As a package manager I use [pnpm](https://pnpm.io/). You can install it with the following command:

```bash
npm install -g pnpm
```

### Running the application

#### Run Redis

```bash
docker run --name short-url-redis -p 6379:6379 -d redis
```

#### Run the application

```bash
pnpm install

pnpm start
```

## Copyrights

```text
MIT License

Copyright (c) 2023 Christopher Jäger (Mogler)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
