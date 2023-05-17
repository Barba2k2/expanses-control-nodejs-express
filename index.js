import express from 'express';

const app = express();

// REST API

// GET
app.get('/transactions', (request, response) => {
    console.log('GET transaction');
    response.json([{id: 1}]);
})

app.listen(3000, () => {console.log('API rest iniciada em http://localhost:3000')})