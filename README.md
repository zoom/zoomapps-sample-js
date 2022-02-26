# Hello Zoom Apps

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html)

Zoom Apps allow you to embed your application directly within the Zoom Client. This allows you to bring your apps to the
meetings your users are in.

Use this codebase to make something awesome!

## Prerequisites

1. [Docker](https://docker.io/)
2. Zoom [Pro Plan or higher](https://support.zoom.us/hc/en-us/articles/207278726-Plan-Types-)
3. [Zoom App]() OAuth Credentials (Client ID, Secret and Redirect URI)

You can follow [this guide]() to create a Zoom App with the [Zoom Marketplace](https://marketplace.zoom.us/).

## Installation

To get started clone the repo:

```shell
git clone https://github.com/zoom/hello-zoom-apps.git
```

Once cloned navigate to the `hello-zoom-app` directory:

```
cd hello-zoom-apps
```

## Setup

To start, fill out the [.env](.env) file with your Client ID, Secret and Redirect URI. No other fields need to be
updated and many will be generated in the next section.

```dotenv
ZM_CLIENT_ID=...
ZM_CLIENT_SECRET=...
ZM_REDIRECT_URI=...
```

#### Zoom for Government

If you are a [ZfG](https://www.zoomgov.com/) customer you can use the `ZM_HOST` variable to change the base URL used for
Zoom.

## Start the App

Run the `compose` npm script to start the app in development mode. This will generate random secrets for testing and
start the application in a Docker container.

```shell
npm run compose
```

#### Production

To start the app in production mode, you can use the `start` npm script.

This requires that you have an instance of MongoDB running locally and that you have adjusted the `MONGO_URL` connection
string found in the [.env](.env) to match the location of your server.

```shell
npm start
```

## Serve over HTTPS

In order to use the Zoom App within Zoom you'll want to make sure that you're serving over HTTPS and your app is
publicly accessible. Often the easiest way to accomplish this is to use a tool like [Ngrok](https://ngrok.com):

```shell
ngrok http 3000
```

## Usage

Use the Ngrok URL to configure your Zoom App on the Zoom Marketplace with the following information:

- Home Page: /
- Redirect URL: /auth

example: https://blahblah.ngrok.com:1234/auth

Click Install from the Activation tab to open the app in your Zoom Client.

## Deployment

You can deploy this app on any service that allows you to host dynamic Node.js apps:

1. [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
2. [Google Cloud](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs)
3. [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/)

## Contribution

Please send pull requests and issues to this project for any issues or suggestions that you have!

### Code Style

This project uses prettier and eslint to enforce style and protect against coding errors along with a pre-commit git
hook to ensure files pass linting prior to commit.

### Testing

At this time there are no e2e or unit tests

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
