# [Temporary token storage](https://github.com/devballteam/tokenStorage)
This is server which help share tokens per environments between two or more machines.
Another feature is serving HTML file with generated HTML tag with attributes based on template from 'pages' directory and data from json file.

## Setup server:
```
npm install
node index.js (or pm2 start index.js --name tokenStorage)
```

## Usage:
### Save token:
```
POST localhost:3001/{ENV_NAME}/{TOKEN}
```
where {ENV_NAME} is environment name and {TOKEN} is value of token to store.
CURL example:
```
curl -X POST http://localhost:3001/dev/testtoken
```

### Read token:
```
GET localhost:3001/{ENV_NAME}
```
where {ENV_NAME} is environment name.

### Open HTML page:
```
GET localhost:3001/page/{PAGE_NAME}/{CLIENT_NAME}
```
where {PAGE_NAME} is page name which template with tag placeholder and {CLIENT_NAME} is client name for this page.
Example:
```
<html>
  <head></head>
  <body>
    {tag}
  </body>
</html>
```

### Save tag data for page:
```
POST localhost:3001/page/{PAGE_NAME}/{CLIENT_NAME}
```
where {PAGE_NAME} is page name and {CLIENT_NAME} is client name for this page.
CURL example:
```
curl -d '{"script": { "src":"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", "data-test":"jquery-test" }}' -H "Content-Type: application/json" -X POST http://localhost:3001/page/wrapper/firefox
```
