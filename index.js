
// Learning and Practicing REST API 

const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
]

// send get request to server homepage
app.get('/', (req, res) => {
    res.send('Welcome to my World')
})

// fetching all courses
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// fetching a single resource
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('Requested course ewith the given id not found')
    res.send(course)
})

// updating the courses with post method
app.post('/api/courses',( req, res) => {
     const { error } = validateCoures(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

// Before the code is refactor
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('Requested course with the given id not found')

    const { error } = validateCoures(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    course.name = req.body.name
    res.send(course)
})

// Validation is refactor into a function
function validateCoures(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

// Deleting a course from list of courses
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('Requested course with the given id not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)

})

// Setting the port parameters
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening to app on port ${port}`)
})

























