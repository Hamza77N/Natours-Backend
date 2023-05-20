import express from "express";


const app = express();
const PORT = 3000



app.get('/', (req, res) => {

  res.status(200).json({ message: 'hello from backend', app: "Natours" })


})

app.post("/", (req, res) => {

  res.send ( "you can post to this endpoint ")


})


app.listen(PORT, () => {

  console.log(`app running on port ${PORT}`)

})
