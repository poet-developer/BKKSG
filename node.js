const db = require('./lib/db');
const express =  require('express');
const app =  express();
const port = 3030;
const text = "진행중";

app.get('/', (request, response) => {
     db.query(`SELECT * FROM author`,(error,authors) => {
          if(error){throw error;}
          console.log(text);
          response.send(JSON.stringify(authors[0].id));
     });
});

app.get('/test', (request, response) => {
     response.send('TEST 화면입니다');
});

app.get('/jogack', (request, response) => {
     response.send('JOGACK JOGACK');
});


app.listen(port);