const express = require('express');
const requests = require("requests");
const app = express()
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  
 //res.send(req.query.amount)
 res.send("Hello")
 // http://localhost:3000/?amount=50
  

})
app.get('/about', (req, res) => {
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=845652a47a12405ee9ff49a929c3f813`
  )
    .on("data", (chunk) => {
      const objdata = JSON.parse(chunk);
      const arrData = [objdata];
       console.log(arrData[0].name);
      // const realTimeData = arrData
      //   .map((val) => 
      //   console.log(val)
      //   // replaceVal(homeFile, val)
      //   )
      //   .join("");
      res.write(`${arrData[0].name} and Temp is ${arrData[0].main.temp}`);
      // console.log(realTimeData);
    })
    .on("end", (err) => {
      if (err) return console.log("connection closed due to errors", err);
      res.end();
    });
 // res.send('about World!!')
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})