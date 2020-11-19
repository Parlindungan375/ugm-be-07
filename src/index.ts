import path from 'path'
import express from 'express'
import routes from './routes'

const app = express();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.use('/admin', routes)

app.listen(3030, () => {
  console.log('server start on port 3030');
});
