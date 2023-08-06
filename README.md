# grepnet

🕸 Web Scraper

## Features

* ✅ Display list of task
* ✅ Add a task
* ✅ Edit a task
* ✅ Remove a task
* ✅ Display notification when task is completed
* ✅ Make a request to complete a task

## Usage

```bash
# GET
curl http://localhost:3000/
# POST
curl -d url=https://piecioshka.pl&phrase=Kowalski localhost:3000
```

## How to run with `PM2`?

```bash
pm2 start ecosystem.config.js
```

## How to run on local?

```bash
PORT=4000 npm start
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2015-2023
