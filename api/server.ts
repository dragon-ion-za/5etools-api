const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
import { router } from './router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
  
app.use(express.json());
app.use(express.static("public"));

app.use('/', router);
  
app.listen(5001, function() {
    console.log("Server started on port 5001");
});