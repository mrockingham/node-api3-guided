const express = require('express'); // importing a CommonJS module
const morgan =require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();



// the three amigas
function GateKeeper(req, res, next){
  const seconds = new Date().getSeconds()

  if(seconds % 3 === 0){
    res.status(403).json({you: 'cannot pass!'})
  } else{
    next()
  }
}

function requiresAuth(req, res, next){
  const {password} = req.headers

  if(password) {
    next()
  } else{
    res.status(401).json({erro: 'wrong password'})
  }
}




// Global middleware
server.use(morgan(':method' ))
server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
