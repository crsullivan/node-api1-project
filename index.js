// implement your API here
const express = require('express'); 

const db = require('./data/db.js');

const server = express(); 


server.use(express.json());


server.get('/', (req, res) => {
  res.send('Hello Node 23!');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'failed to get hubs from db' });
    });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
   
    db.findById(id)
      .then(user => {
          if (user) {
        res.status(200).json(user);
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'The user information could not be retrieved.' });
      });
    });

  server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const editUser = req.body
    if (!Object.keys(editUser).includes("name") || !Object.keys(editUser).includes("bio")){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db.update(id, editUser)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'The user information could not be modified.' });
      });
  });

server.post('/api/users', (req, res) => {
    const newInfo = req.body
    if (!Object.keys(newInfo).includes("name") || !Object.keys(newInfo).includes("bio")){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

  db.insert(newInfo)
    .then(user => {
      res.status(201).json(newInfo);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'There was an error while saving the user to the database' });
    });
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            if (user) {
                res.status(200).json({ message: `user ${id} was deleted.` })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: `The user could not be removed.` })
        })
})

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));