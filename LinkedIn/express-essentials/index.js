import express, { response } from "express";
import data from "./data/MOCK_DATA.json" assert { type: "json" };

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/images', express.static('images'));

app.use(express.json());

app.use(express.urlencoded({extended: true }));

app.post('/item', (request, response) => {
    console.log(request.body);
    response.send(request.body); 
});

app.route('/class')
.get((request, response) => {
    //response.send('Retrieve class info');
    throw new Error();
})
.post((request, response) => {
    response.send('Create class info');
})
.put((request, response) => {
    response.send('Update class info');
})

//GET
app.get('/class/:id', (request, response) => {
    const studentId = Number(request.params.id);
    const student = data.filter((student) => student.id === studentId);
    response.send(student);
    
    //console.log(request.params);
});

app.get('/', (request, response) => {
    response.json(data);
    //response.send('This is a GET request at /')
});

app.get('/next',(request, response, next) => {
    console.log('The response will be sent by the next function.');
    next();
},
(request, response) => {
    response.send('I just set up a route with a second callback.');
}
);

app.get('/download', (request, response) => {
response.download('images/mountains_2.jpeg');
});

app.get('/redirect', (request, response) => {
response.redirect('http://www.linkedin.com');
});

//CREATE - POST saveguards input with encryption.
app.post('/create', (request, response) => {
    response.send('This is a POST request at /create')
});

//EDIT
app.put('/edit', (request, response) => {
    response.send('This is a PUT request at /edit')
});

//DELETE
app.delete('/delete', (request, response) => {
    response.send('This is a DELETE request at /delete')
});

app.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

//set DEBUG=express:* node --experimental-json-modules index.js