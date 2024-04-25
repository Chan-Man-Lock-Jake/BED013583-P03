import express from "express";
import data from "./data/MOCK_DATA.json" assert { type: "json" };

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/images', express.static('images'));

app.get('/', (request, response) => {
    response.json(data);
    //response.send('This is a GET request at /')
});

//GET
app.get('/class/:id', (request, response) => {
    const studentId = Number(request.params.id);
    const student = data.filter((student) => student.id === studentId);
    response.send(student);
    
    //console.log(request.params);
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

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
    console.log(data);
});

//