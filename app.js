const express = require('express');
const fetch = require('node-fetch');

const webhookId = '932666422444838922';

const app = express()

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>')
});

app.get('/egpointpurchase', async function (req, res) {
  res.send('<h1>sending your request..</h1>')
  console.log(req.query);

  const json2Send = {
    webhookSignalType: 'POST',
    context: 'egpointpurchase',
    data: req.query
  }

  const { url } = await fetch(`https://discord.com/api/webhooks/${webhookId}`, {
	  method: 'get',
	  headers: {'Content-Type': 'application/json'}
  }).then(async response => await response.json());

  const response = await fetch(`${url}?wait=true`, {
	  method: 'post',
	  body: JSON.stringify({ content: JSON.stringify(json2Send) }),
	  headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  console.log(data);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));