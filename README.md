Deploy no CD:

```
gcloud builds submit --tag gcr.io/artemfyi/bodybeat
```

```
gcloud run deploy --image gcr.io/artemfyi/bodybeat --platform managed
```

region: europe-west1 (15)


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
