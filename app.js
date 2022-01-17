const express = require('express');
const fetch = require('node-fetch');

const webhookURL = 'https://discord.com/api/webhooks/932666422444838922/CGadoK8f1WPNiN64ADX6EdF_uLKzeDPiCf1z-VSeuoi5RMaI2SX53dtomIx-eRo2gwXc';

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

  const response = await fetch(`${webhookURL}?wait=true`, {
	  method: 'post',
	  body: JSON.stringify({ content: JSON.stringify(json2Send) }),
	  headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  console.log(data);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));