import express from 'express';
import mongoose from 'mongoose'
import morgan from 'morgan';
import router from './router.js'

const app = express();

//Connect to DB
mongoose.connect('mongodb+srv://complain:complain@cluster0.rnqf6.mongodb.net/complain-handling?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
,() => {
    console.log('Connect to DB success');
});

//Midlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.json({
        message: 'success',
    });
});

app.use('/api', router); http://localhost:4000/api/complainHandling

app.listen('4000', () => {
    console.log('App listens to port 4000');
});