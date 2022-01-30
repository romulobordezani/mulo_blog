const awsServerlessExpress = require('aws-serverless-express');
const server = require('./dist/mulo-blog/server/main.js');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const binaryMimeTypes = [
  "application/javascript",
  "application/json",
  "application/octet-stream",
  "application/xml",
  "image/jpeg",
  "image/png",
  "image/gif",
  "text/comma-separated-values",
  "text/css",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/text",
  "text/xml",
  "image/x-icon",
  "image/svg+xml",
  "application/x-font-ttf",
  "font/ttf",
  "font/otf"
];

const app = server.app();
app.use(awsServerlessExpressMiddleware.eventContext());
const serverProxy = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
module.exports.handler = (event, context) => awsServerlessExpress.proxy(serverProxy, event, context);
