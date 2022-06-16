// import fetch from 'node-fetch' //MUST DOWNLOAD FOR NODE TO USE HTTP REQUEST FECTH FUNCTION
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

// const app = express()
const PORT = process.env.PORT || 3000 

// app.use(cors)
// app.use(bodyparser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'index.html')))


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
router.get('/title=Looking',function(req, res){
    res.send(path.join(__dirname+'https://data.sfgov.org/resource/yitu-d5am.json?title=Looking'));
})

app.use('/',router)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))  


