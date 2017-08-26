# RUFLIX
_[Rutracker.org] client_

Cross-platform (Windows/Linux/Mac) torrent-media streamer, providing immediate access to music and video content shared by torrents on rutracker.org.

Inspired by [Butter-project], based on [Webtorrent]
****
Ruflix is in active development right now, and first (alpha) versions are planned for Nov. 2017.

****
**Features**

Already works:
- Read Rutracker catalogs and forums provided by api.rutracker.org
- Read Rutracker feed (feed.rutracker.org)
- Playing audio
- torrent stream/host (backend)
- Video player (ui)

In active development:
- Player optimizations and functionalities
- NWJS Windows/Mac/Linux builds

Planned:
- E-book reader
- I2P connection support (anonimization and censorship bypass)
- UPnP and NAT-PMP port forwarding
- Caching downloads, playing statistics
- Mobile (Cordova) version
- CI, tests, other dev-ops
- many other features

****

**Requiremenets**

- node.js version min. 6.31
- Google Chrome (for hosting dev server)

****

**Install**

- `npm install ngRuflix`
- `npm start`
- Go to `http://localhost:8080` and use your rutracker.org credentials for login, or use guest mode.

Search feature is disabled for Guests, due to rutracker restrictions.

There are some problems running multiple tasks on Windows.
Run one command line and run
- `node server.js`
run in second command line:
- `npm run server`

**Develop and contribute**

Add pull request, or issue, or contact me at thecyberd3m0n@gmail.com
I'll provide additional ways to support the project later
****

**License**

GPL v2 license.

[Butter-project]: http://butterproject.org/

[backend-rustreamer]: https://github.com/thecyberd3m0n/backend-rustreamer
[Webtorrent]: https://webtorrent.io/#
[Rutracker.org]: http://rutracker.org/