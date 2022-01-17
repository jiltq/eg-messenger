const express = require('express');
const fetch = require('node-fetch');

const app = express()

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(`index.html`)
});

app.get('/egpointpurchase', async function (req, res) {
  res.send('<h1>sending your request..</h1>')
  console.log(req.query);

  const json2Send = {
    webhookSignalType: 'POST',
    context: 'egpointpurchase',
    data: req.query
  }

  const response = await fetch('https://discord.com/api/webhooks/932397905610936320/RM7WdQs-1fdCQyadhfv4JHjimr5vg0owMpKMOTpuePXYWwKxgIv21df_f45Xe15jK_7z', {
	  method: 'post',
	  body: JSON.stringify({ content: JSON.stringify(json2Send) }),
	  headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  console.log(data);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));