const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const tokenFilePath = './token.json';
const pagesPath = './pages';
const Remarkable = require('remarkable');
const md = new Remarkable();

app.get('/', async (req, res) => {
  const readMe = await readFile('./README.md', 'utf8');
  const html = `<html><head>
    <title>Temporary token storage</title>
    <meta charset="UTF-8">  <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap/3.2.0/css/bootstrap.css">
  </head><body style="width: 80%; margin: auto" class="markdown-body">${md.render(readMe)}</body></html>
  `;
  res.status(200).send(html);
});

app.get('/token/:env', async (req, res) => {
  try {
    const jsonFile = await readFile(tokenFilePath);
    const parsedToken = JSON.parse(jsonFile);
    res.status(200).send(parsedToken[req.params.env]);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/token/:env/:token', async (req, res) => {
  try {
    const jsonFile = await readFile(tokenFilePath) || '{}';
    const parsedToken = JSON.parse(jsonFile);

    parsedToken[req.params.env] = req.params.token;
    await writeFile(tokenFilePath, JSON.stringify(parsedToken, null, 2));
    res.status(200).send('ok');
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/page/:page', async (req, res) => {
  try {
    const html = await readFile(pagesPath + '.html');
    res.status(200).send(html);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/page/:page', async (req, res) => {
  try {
    const html = await readFile(pagesPath + '.html');
    parsedToken[req.params.env] = req.params.token;
    await writeFile(tokenFilePath, JSON.stringify(parsedToken, null, 2));
    res.status(200).send('ok');
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
