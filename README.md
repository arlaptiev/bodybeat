Deploy no CD:

```
gcloud builds submit --tag gcr.io/artemfyi/bodybeat
```

```
gcloud run deploy --image gcr.io/artemfyi/bodybeat --platform managed
```

region: europe-west1 (15)

