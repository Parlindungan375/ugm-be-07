import path from 'path'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import ngrok from 'ngrok'

const cool = require('cool-ascii-faces');

const app = express();


app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3030"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.use('/admin', routes)
app.get('/cool', (req, res) => res.send(cool()))

app.listen(process.env.PORT, () => {
  console.log('server start on port ', process.env.PORT);
});

ngrok
  .connect({
    proto : 'http',
    addr : process.env.PORT,
  })
  .then(url => {
   console.log(`💳  App URL to see the demo in your browser: ${url}/`);
  })
  .catch(err => {
   if (err.code === 'ECONNREFUSED') {
    console.log(`⚠️  Connection refused at ${err.address}:${err.port}`);
   } else {
    console.log(`⚠️ Ngrok error: ${JSON.stringify(err)}`);
   }
   process.exit(1);
  });
