let express = require('express');
let app = express();
app.use(express.json());

//DB connection
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://ml8780:week7@michellecluster.mdd2xr3.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");

    // this code was giving me error--ReferenceError: doStuff is not defined
    // doStuff();
});

db.connect();

//route on server to listen for a POST request-- issue: cannot get to '/dream'
app.post('/dream', (request, response) => {
    console.log(request.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        dream: request.body.dream,
        color: request.body.color,
        feeling: request.body.feeling
    }

    //DB 2: add values to the DB
    db.push("dreamData", obj);

    response.json({ task: 'success' })
})

app.use('/', express.static('public'));

app.listen(3000, () => {
    console.log('listening at locahost:3000');
})

//route on server to listen for a GET request to get recorded data
app.get('/getArchive', (request, response) => {

    //DB 3: fetch from the DB
    db.get("dreamData").then( archivedData =>{
        let obj = { data: archivedData };
        response.json(obj);
    })

})