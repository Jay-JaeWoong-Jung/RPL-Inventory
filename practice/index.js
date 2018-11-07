
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('hello world');
});

// http://localhost:3000/api/courses?sortBy=name
app.get('/api/courses', (req, res) => {
    //res.send(req.query);
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course)
        return res.status(404).send('the course with the given ID was not found');

    res.send(course);

});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error)//404 bad request
        return res.status(404).send(result.error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
}) ;

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    // if doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course)
        return res.status(404).send('the course with the given ID was not found');
 
    //validate
    //if invalid, reutrn 400 - bad request
    
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if(error) {
        //404 bad request
        return res.status(404).send(result.error.details[0].message); 
    }

    // update courase
    // return the updated course
    course.name = req.body.name;
    res.send(course); 

});


app.delete('/api/courses/:id', (req, res) => {
    //Look up the course
    // if doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course)
        return res.status(404).send('the course with the given ID was not found');
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT ||3000;

app.listen(3000, () =>console.log('listening on port 3000....'));

