### Versions

These are known to work but other versions may also do it.

- node 8.11.3
- npm 6.1.0

### Setup

    $ npm install

### Run

Solo

    $ npm start

With dummy back-end

    $ npm run dummy

### Tests

    $ npm test

### Deploy

To http://embs.io/retodjango

    $ npm build
    $ cp -R ./build/ ~/Code/embs/embs.github.io/
    $ cd ~/Code/embs/embs.github.io && git add . && git commit
    $ git push origin master
