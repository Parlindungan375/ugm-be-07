import path from 'path'
import express from 'express'
import routes from './routes'
import cors from 'cors'

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

app.listen(3030, () => {
  console.log('server start on port 3030');
});
