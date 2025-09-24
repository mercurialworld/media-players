# Media Players Web Page

![Deno Badge](https://img.shields.io/badge/Deno-70FFAF?logo=deno&logoColor=000&style=flat) ![Docker Badge](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=flat) ![Mantine Badge](https://img.shields.io/badge/Mantine-339AF0?logo=mantine&logoColor=fff&style=flat) ![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat)

[![Music Presence Badge](https://img.shields.io/badge/Music_Presence-grey.svg?logo=data:image/png;base64,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)](https://musicpresence.app)

A single web page that populates itself from a call to the Music Presence media players API. Only uses React.

The search bar filters by the official, human-readable name, as well as whatever services the player can represent. The filters check for the existence of sources for each platform.

This site was originally meant as a React playground, so I have no idea if anything I'm doing is best practices. If you like this site and thought it was useful, though, [feel free to buy me a coffee](https://coff.ee/mercurialworld) so I can pay for the server this is deployed on.

## How to run

Install [Deno](https://deno.land). Then, run

```sh
deno install
deno run dev
```

To preview the production build, run
```sh
deno run build
deno run preview
```

# Contributing

This repository uses [`pre-commit`](https://pre-commit.com/). Install this Python package globally with your package manager of choice, and then run it to set it up:

```sh
uv tool install pre-commit
pre-commit
```

