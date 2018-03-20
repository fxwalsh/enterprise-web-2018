

router.get('/user/:id',(req, res)=>{
  res.send('user ' + req.params.id);
});


const server = express();

//configure body-parser middleware
server.use(body_parser.json());
//parses application/x-www-form-urlencoded
server.use(body_parser.urlencoded());
...
router.post('/echo',(req, res)=>{
  console.log(req.body);
  res.json(req.body);
});



//Add a contact
router.post('/', (req, res) => {
		let newContact = req.body;
		if (newContact){
          contacts.push({name: newContact.name, address : newContact.address});
          res.status(201).send({message: "Contact Created"});
      }else{
      	  res.status(400).send({message: "Unable to find Contact"});
      }
});


res.send({ some: 'json' });
res.send('<p>some html</p>'); res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });


res.format({
  'text/plain': function(){
    res.send('hey');
  },

  'text/html': function(){
    res.send('<p>hey</p>');
  },

  'application/json': function(){
    res.send({ message: 'hey' });
  },

  'default': function() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
  }
});



function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/login"); // or render a form, etc.
  }
}

// Automatically apply the `requireLogin` middleware to all
// routes starting with `/admin`
router.all("/admin/*", requireLogin, (req, res, next)=> {
  next(); // if the middleware allowed us to get here,
          // just move on to the next route handler
});

router.get("/admin/posts", (req, res)=> {
  // if we got here, the `app.all` call above has already
  // ensured that the user is logged in
});
