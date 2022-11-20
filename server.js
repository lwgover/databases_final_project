// Returns the Express application object
const app = express();
const port = 3000;

// Tell express object where to find your CSS, JS, and images
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Register middleware to be used
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


// Route definitions
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// Prints the request body so you can see the json data sent in the request
// Sends back a response with the phrase "You did it!" for congratulations
app.post("/postButton", (req, res) => {
    console.log(req.body);
    res.json({ text: "You did it!" });
})

app.get("/dogs", (req, res) => {
    console.log('got here');
    res.sendFile(__dirname + '/views/dogs.html');
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.send('<h1>Successful Login</h1>');
});

// starts web server listening on localhost at port 3000
app.listen(port, () => {
    console.log('Listening on port 3000...');
});