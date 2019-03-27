# Okta Nuxt.js Example

This repository demonstrates a simple integration of the Okta sign in widget with the Nuxt.js framework.

## Build Setup

``` bash
# install dependencies
$ npm install

#configure .env file in the root directory with the following values 
VUE_APP_CLIENT_ID='<your client id>'
VUE_APP_ISSUER='<your authz server>'
VUE_APP_SCOPE=openid profile email
VUE_APP_REDIRECT_URI='http://localhost:3000/implicit'

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
