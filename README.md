## LN-DASHBOARD

|[![Docker Pulls](https://img.shields.io/docker/pulls/vincenzopalazzo/ln-dashboard?style=flat-square)](https://hub.docker.com/repository/docker/vincenzopalazzo/ln-dashboard)

## Table of Content

- Introduction
- How to run
- Contribute
- License

## Introduction
TODO

## How to run

### Docker and/or docker-compose


### Command line
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You need to specify the env variable like `NEXT_PUBLIC_REST_URL=http://localhost:7001`, and run the plugin [jrest](https://github.com/clightning4j/jrest) on your lightning node.
The value of the env variable is the url of the server, usually `http://loaclhost:700`.

## License
TODO