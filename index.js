var args = process.argv.slice(2);
var method = args[0];

var User = require('./models/user.js');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', (req, res) => res.send('Hello World!'))
app.get('/hello_lagi', (req, res) => res.send('Hello World!'))

app.get('/users', function(req, res) { 
  User.all()
    .then(data => {
      res.status(200).json({
        status: true,
        data: data.map(i => i.entity()) 
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.get('/users/:id', function(req, res) {
  User.find(req.params.id)
    .then(data => {
      res.status(422).json({
        status: true,
        data: data.entity()
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.post('/users', function(req, res) {
  let { name, email, password, password_confirmation } = req.body;
  
 

  if (password !== password_confirmation) return res
    .status(400)
    .json({
      status: false,
      errors: 'Password doesn\'t match!'
    })


    
  let user = new User({ name, email, password, password_confirmation });
  user.save()
    .then(data => {
      res.status(201).json({
        status: true,
        data: data.entity() 
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.put('/users/:id', function(req, res) {
  User.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json({
        status: true,
        data: data.entity() 
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})

app.get('/posts', function(req, res) {
  Post.all()
    .then(data => {
      res.status(200).json({
        status: true,
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})

app.get('/posts/:id', function(req, res) {
  Post.find(req.params.id)
    .then(data => {
      res.status(422).json({
        status: true,
        data: data 
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.post('/posts', function(req, res) {
  let { title, body } = req.body;


  let post = new Post({ title, body });
  post.save()
    .then(data => {
      res.status(201).json({
        status: true,
        data: data 
      });
    })
    .catch(err => {
      res.status(422).json({
        status: false,
        errors: err
      });
    })
})

app.put('/posts/:id', function(req, res) {
  Post.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json({
        status: true,
        data: data 
      });
    })
    .catch(err => {
      res.status(400).json({
        status: false,
        errors: err
      });
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


/*
switch(method) {

  case 'create_user':
    let [ first_name, last_name, email, password, password_confirmation] = args.slice(1);

    let user = new User({
      first_name, last_name, email, password, password_confirmation
    })

    user.save().then(i => console.log(i)).catch(err => console.error(err));
    break;

  case 'read_user_by_id':
    User.find(args.slice(1)[0])
      .then(data => console.log(data))
      .catch(err => console.error(err))
    break;
    
  case 'create_post":
    let [ title, body] = args.slice(1);

    let post = new Post({
      title, body
    })

    post.save(). then(i => console.log(i)).catch(err => console.error(err));
    break;

  case 'read_post_by_id':
    Post.find(args.slice(1)[0])
      .then(data => console.log(data))
      .catch(err => console.log(err))
    break;

  case 'update_post'
    id = args[1]
    let data = args[2];
    let updateParams = JSON.parse(data);

    updatepost(id, UpdateParams)
    break;
  default:
    console.log('Unknown action!');
}
*/