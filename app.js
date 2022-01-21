const express = require('express');
const fetch = require('node-fetch');

const webhookURL = 'https://discord.com/api/webhooks/932710078719598672/BIm7q0U5nJF38ga4VxUWs0gwfebNjQ9zhLZ0t8cTWEAULSjjHE5Ht7pc7vBR64oloyYf';

const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>')
});

app.get('/egpointpurchase', async function (req, res) {
  console.log(req.query);

  const json2Send = {
    webhookSignalType: 'POST',
    context: 'egpointpurchase',
    data: req.query
  }

  const response = await fetch(`${req.query.webhookurl}?wait=true`, {
	  method: 'post',
	  body: JSON.stringify({ content: JSON.stringify(json2Send) }),
	  headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  console.log(data);
  res.send('<script>window.close()</script>');
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));