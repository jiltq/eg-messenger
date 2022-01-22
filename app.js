const express = require('express');
const fetch = require('node-fetch');

const app = express()
let lastwebhookurl = null;

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>')
});

app.get('/linkbutton', async function (req, res) {
  res.send('e.html');
  return;
  if (req.query.webhookurl) {
    lastwebhookurl = req.query.webhookurl;
  }
  if (!req.query.webhookurl) {
    // then it must be a fragment
    res.send('fragment.html');
    /*
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    for (const [key, value] of fragment.entries()) {
      req.query[key] = value;
    }
    */
    req.query.webhookurl = lastwebhookurl;
  }

  const json2Send = {
    webhookSignalType: 'POST',
    ...req.query
  }

  await fetch(`${req.query.webhookurl}?wait=true`, {
	  method: 'post',
	  body: JSON.stringify({ content: JSON.stringify(json2Send) }),
	  headers: {'Content-Type': 'application/json'}
  });
  res.send('<script>window.close()</script>');
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));