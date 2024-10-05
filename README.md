# argo-heli.ch
This is the website https://argo-heli.ch

It is hosted on and deployed using Netlify: https://app.netlify.com/sites/argo-heli


## Directory Layout
```
argo-heli/
|
 - argo-heli/ # production app, not currently deployed
|
 - parking/ # parking page, currently deployed
|
 - README.md # this file
```

## Parking Page
To preview the page from GitHub Codespace, the Python web server can be used:

```bash
python -m http.server --directory ./parking
```

This will serve the directory via HTTP on port 8000.
