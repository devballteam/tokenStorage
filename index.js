const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const tokenFilePath = './token.json';

app.get('/:env', async (req, res) => {
  try {
    const jsonFile = await readFile(tokenFilePath);
    const parsedToken = JSON.parse(jsonFile);
    res.status(200).send(parsedToken[req.params.env]);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/:env/:token', async (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
