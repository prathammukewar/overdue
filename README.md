# Overdue

Everything your free library card gets you, and what it's worth.

Live at **https://prathammukewar.github.io/overdue/**

Most people use a library card for books, if they use it at all. The same card often gets you audiobooks, movies, newspapers, language apps, tutoring, museum passes and a shelf of things you can borrow, like hotspots and telescopes. This site lists all of it, prices it against what you'd pay otherwise, and shows you how to get a card, including from big-city libraries that give cards to people who don't live there.

## How the numbers work

Every line in the calculator is `how much you'd use it × the regular price of the closest paid thing`. An audiobook is priced as a month of Audible Standard, which gets you one a month. A month of Kanopy is priced as a month of the Criterion Channel. A museum visit is one adult ticket at the Art Institute of Chicago. The page shows the math on every line and links the price it used.

The default total counts the common stuff at an everyday pace and leaves the rarer perks switched off, so it lowballs on purpose.

Prices are standard US list prices, not intro deals or student rates. Every price, rule, fee and link lives in `js/data.js` with a `source` URL and the month it was last checked. If a claim couldn't be checked against an official page, it isn't on the site.

Libraries pick their own services, so nothing here is promised for your library. The site says how common each thing is and links the service's own "find your library" page where one exists.

## Spot something wrong?

Prices and library rules change. If something is out of date, [open an issue](https://github.com/prathammukewar/overdue/issues) with a link to the official page and I'll fix it.

## Run it locally

It's plain HTML, CSS and JavaScript modules with no build step.

```sh
python3 -m http.server
```

Then open http://localhost:8000. Tests use Node's built-in runner and have no dependencies:

```sh
node test/test.mjs
```

## License

MIT. See [LICENSE](LICENSE).
