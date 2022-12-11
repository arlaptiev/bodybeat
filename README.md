# STACK:

CRA, Tailwind CSS, Github Pages, Eslint

Minor:
OG tags, Router, Fonts, Tailwind Typography

Potential todos:
* add analytics
* cannot automatically modify manifest.json as of CRA 5 :c

# Starting:

1. .env
2. package.json
3. public/manifest.json


Setup:
Add these lines to `node_modules/react-scripts/config/webpack.config.js` (from [here](https://bobbyhadz.com/blog/module-not-found-cant-resolve-fs):
```
      fallback: {
        "fs": false,
        "os": false,
        "path": false,
        "crypto": false,
      },
```
