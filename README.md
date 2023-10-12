# Detector Inspector Challenge

Thank you for your time for checking my code. I use `Typescript` and `ExpressJs` for the application.

## How it works?

I create an API endpoint `/chart?url=xxx` to handle the `GET` request

1. It will validate the input URL first.
2. If is valid, it will fetch the URL with [`axios`](https://axios-http.com) to get the HTML source code.
3. Next, I use [`cheerio`](https://cheerio.js.org) library for parsing HTML code to find the tables on the page. We care about the tables in the main page section, so I only check the tables with class name `.wikitable`.
4. It will check on each table, find the first table with numeric values, and extract an array of numbers (numbers are from the same column).
5. Now, it will create the Graph with [`Chart.js`](https://www.npmjs.com/package/chart.js?activeTab=readme) and convert it into an image with [`chartjs-node-canvas`](https://www.npmjs.com/package/chartjs-node-canvas) package.
6. Finally, you can see the result as an image. It also gets saved as `chart.png` on the root folder.

## How to run it?

1. Clone the code.
2. Run `npm install` and wait for the installing process.
3. Run `npm run dev`
4. Visit `http://localhost:8000` _(you can click `view demo` link for quick checking the result)_
5. Or you can send a `GET` request to `http://localhost:8000/chart?url=xxx` _(Replace `xxx` with your URL from Wikipedia)_
6. For testing, run `npm run test`

**Demo URLs:**

- https://en.wikipedia.org/wiki/Demographics_of_Australia
- https://en.wikipedia.org/wiki/Demographics_of_China
- https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression

**Issue you might get:**

In case, you get errors in the installation process, it's because you don't have a supported OS or processor architecture, the module will be compiled on your system. This requires several dependencies, including `Cairo` and `Pango`.

| **OS**  | Command                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| OSX     | Using [Homebrew](https://brew.sh/): `brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman` |
| Ubuntu  | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`    |
| Fedora  | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`                         |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`                                 |
| OpenBSD | `doas pkg_add cairo pango png jpeg giflib`                                                                  |
| Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)                        |
| Others  | See the [wiki](https://github.com/Automattic/node-canvas/wiki)                                              |

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072). If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.
