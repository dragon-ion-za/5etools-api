const express = require("express");
const bodyParser = require("body-parser");  
const fs = require("fs");


const app = express();
  
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/adventures', (req: any, res: any) => {
    fs.readFile(
        "../data/adventures.json", "utf8", (err: any, jsonString: any) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }

            let adventures = JSON.parse(jsonString);

            res.send(adventures);
    });
});
  
app.listen(5001, function() {
    console.log("Server started on port 5001");
});