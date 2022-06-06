# Zoom App Template

Use of this sample server is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html)

This Zoom App Template uses Node + Express.js to build a Hello World Zoom App.

## Prerequisites

1. [Node JS](https://nodejs.org/en/)
2. [Zoom Account](https://support.zoom.us/hc/en-us/articles/207278726-Plan-Types-)
3. [Zoom App Credentials]() (Instructions below)
    1. Client ID
    2. Client Secret
    3. Redirect URI

### Create your Zoom App

You can follow [this guide]() to create a Zoom App with the [Zoom Marketplace](https://marketplace.zoom.us/).

### Client ID and Client Secret

Once your server is created, you can obtain your Client ID and Client Secret from the App Credentials tab of your Zoom
App.

### Home URL and Redirect URL

In order to use the Zoom App within Zoom you'll want to make sure that you're serving over HTTPS and your server is
publicly accessible.

The easiest way to accomplish this is to use a tool like [Ngrok](https://ngrok.com) with the port you're serving on:

```shell
ngrok http 3000
```

Use the Ngrok URL to configure your Zoom App on the Zoom Marketplace with the following information:

1. Home Page: `{{ Ngrok URL }}/`
2. Redirect URL: `{{ Ngrok URL }}/auth`

**Example:** `https://foobar.ngrok.com:1234/auth`

### Scopes

Select the following OAuth scopes from the Scopes tab:

- meeting:read
- meeting:write
- user:read
- zoomapp:inmeeting

### Zoom JS SDK Features

Choose these features from the Zoom JS SDK section of the Features tab:

- shareApp

## Installation

To get started clone the repo:

```shell
git clone https://github.com/zoom/za-template.git
```

Once cloned navigate to the `za-template` directory:

```
cd za-template
```

Then install dependencies. This will automatically copy the .env.sample file to .env and set up the project.

```shell
npm install
```

## Setup

To start, fill out the [.env](.env) file with your **Client ID**, **Client Secret** and **Redirect URI** from your Zoom
App. No other fields need to be updated for development and many will be generated in the next section.

```dotenv
ZM_CLIENT_ID=...
ZM_CLIENT_SECRET=...
ZM_REDIRECT_URL=...
```

#### Zoom for Government

If you are a [ZfG](https://www.zoomgov.com/) customer you can use the `ZM_HOST` variable to change the base URL used for
Zoom. This will allow you to adjust to the different Marketplace and API Base URLs used by ZfG customers.

**Marketplace URL:** marketplace.*zoomgov.com*

**API Base URL:** api.*zoomgov.com*

## Start the App

To test out the app, start in development mode

### Development

Start the server in development mode and watch for changes

```shell
npm run dev
```

The `dev` script will:

2. Watch for changes to the js files in the public/ folder
3. Watch for changes to the server
4. Start the application

### Production

When running your application in production no logs are sent to the console by default and the server is not restarted
on file changes.

We use the `NODE_ENV` environment variable here to tell the application to start in prodcution mode.

****

```shell
NODE_ENV=production npm start
````

## Usage

Install the Zoom App for your user:

1. Navigate to your application on the [Zoom Marketplace](https://marketplace.zoom.us) and Click **Install**
2. or open your Zoom App in a browser ([http://localhost:3000](http://localhost:3000) by default) and click the '
   install' link

## Deployment

You can deploy this server on any service that allows you to host dynamic Node.js apps. You'll first want to make sure
that you've configured a MongoDB server to connect to.

1. [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
2. [Google Cloud](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs)
3. [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/)

## Contribution

Please send pull requests and issues to this project for any problems or suggestions that you have! Make sure that you
install packages locally to pass pre-commit git hooks.

### Keeping secrets secret

This application makes use of your Zoom App Client ID and Client Secret as well as a custom secret for signing session cookies. During development,

> :warning: **Never commit your .env file to version control:** The file likely contains Zoom App Credentials and Session Secrets

In order to align with security best practices, this application does not read from the .env file in production mode.

This means you'll want to set environment variables on the hosting platform that you'
re using instead of within the .env file. This might include using a secret manager or a CI/CD pipeline.

### Code Style

This project uses prettier and eslint to enforce style and protect against coding errors along with a pre-commit git
hook ([husky](https://typicode.github.io/husky/#/)) to ensure files pass checks prior to commit.

### Testing

At this time there are no e2e or unit tests.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
