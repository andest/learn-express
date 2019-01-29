const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const port = 3000

const data = [
  { id: 1, name: 'Budi 1', yearOfBirth: 1, grade: 10  },
  { id: 2, name: 'Budi 2', yearOfBirth: 2, grade: 20  },
  { id: 3, name: 'Budi 3', yearOfBirth: 3, grade: 30  },
  { id: 4, name: 'Budi 4', yearOfBirth: 4, grade: 40  },
  { id: 5, name: 'Budi 5', yearOfBirth: 5, grade: 50  },
  { id: 6, name: 'Budi 6', yearOfBirth: 6, grade: 60  },
  { id: 7, name: 'Budi 7', yearOfBirth: 7, grade: 70  },
];

server.use(express.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => res.send('Hello World!'))

server.get('/student/?', (req, res) => {
  const name = req.query.name;
  const page = req.query.page || 1;
  const displayItems = req.query.displayItems || 3;
  
  let filteredData = data;
  
  const pageItemStartIndex = (page - 1) * displayItems;
  const pageItemEndIndex = (page - 1) * displayItems + displayItems - 1;

  if (name) {
    filteredData = data.filter((_data) => _data.name.includes(name) );
  }

  const totalPages = Math.ceil(filteredData.length / displayItems);
  
  if (page > totalPages) {
    return res.status(400).json({ error: 'Page does not exist' });
  }

  filteredData = data.filter((_data, index) => index >= pageItemStartIndex && index <= pageItemEndIndex );

  return res.json({
    data: filteredData,
    displayItems,
    page,
    totalPages
  })
});

server.post('/student/new/?', (req, res) => {
  const postData = req.body;

  const error = validation(postData);

  if (error) {
    return res.status(400).json({ error });
  }

  data.push({
    id: data.length + 1,
    name: postData.name,
    yearOfBirth: postData.yearOfBirth,
    grade: postData.grade,
  });

  return res.json('Success');
});

server.post('/student/:id/?', (req, res) => {
  const postData = req.body;
  const id = req.params.id;

  let error = '';

  if (!data[id - 1]) {
    error = 'Id not found';
  }

  if (!error) {
    error = validation(postData);
  }

  if (error) {
    return res.status(400).json({ error });
  }

  data[id - 1] = {
    ...data[id- 1],
    name: postData.name,
    yearOfBirth: postData.yearOfBirth,
    grade: postData.grade,
  };

  return res.json({ status: 'Success'});
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

const validation = (postData) => {
  if (!postData.name) {
    return 'Name Required'; 
  }

  if (!postData.yearOfBirth) {
    return 'Year of Birth Required';
  }

  if (!postData.grade) {
    return 'Grade Required';
  }

  return null;
}