# Media Players Web Page

A single web page that populates itself from a call to the Music Presence media players API. Only uses React.

The search bar only filters by the official, human-readable name. The filters check for the existence of sources for each platform.

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

# Preview

![A screenshot of the web page when first loading into it.](repo-assets/preview1.png)

![A screenshot of the web page filtering media players that are available on every platform and the web.](repo-assets/preview2.png)

![A screenshot of the web page filtering media players that include "apple" in the name and are available on MacOS.](repo-assets/preview3.png)