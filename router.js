import express from 'express';
import complainHandling from './database.js';
const router = express.Router();

//@desc     Create new complainHandling
//@route    POST /api/complainHandling
router.post('/complainHandling', async (req, res) => {
    try {

        const { course, title, due_date, status } = req.body;

        const complainHandling = new complainHandling ({
            course: course,
            title: title,
            due_date: due_date,
            status: status,
        });

        const createcomplainHandling = await complainHandling.save();

        res.status(201).json(createdcomplainHandling);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });

    }
});


//@desc     Get all complainHandling
//@route    Get /api/complainHandling
router.get('/complainHandling', async (req, res) => {
    const complainHandling = await complainHandling.find({});

    if(complainHandling) {
        res.json(complainHandling)
    } else {
        res.status(404).json({
            message: 'Complain not Found'
        });
    }
});

//@desc     Get a complain
//route     GET /api/complainHandling/:id
router.get('/complainHandling/:id', async (req,res)=> {
    const complainHandling = await complainHandling.findById(req.params.id);

    if(complainHandling){
        res.json(complainHandling)
    } else {
        res.status(404).json({
            message: 'Complain not found'
        })
    }
});


//@desc     Update a complainHandling
//@route    PUT /api/complainHandling/:id
router.put('/complainHandling/:id', async (req, res) => {

    const { course, title, due_date, status } = req.body;

    const complainHandling = await complainHandling.findById(req.params.id);

    if(complainHandling) {
        complainHandling.course = course;
        complainHandling.title = title;
        complainHandling.due_date = due_date;
        complainHandling.status = status;

        const updatecomplainHandling =  await complainHandling.save();

        res.json(updatecomplainHandling);
    } else {
        res.status(404).json({
            message: 'complainHandling not faound'
        })
    }
})

//desc  Delete a complain
//route DELETE /api/complainHandling/:id
router.delete('/complainHandling/:id', async (req, res) => {

    const { course, title, due_date, status } = req.body;

    const complainHandling = await complainHandling.findById(req.params.id);
  
    if(complainHandling) {
      await complainHandling.remove();
      res.json({
        message: 'Data removed'
      })
    } else {
      res.status(404).json({
        message: 'user not found'
      })
    }
  });

export default router;
