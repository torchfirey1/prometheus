const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const User = require("./users");
app.get("/check",cors(),(req,res)=>{
    res.json("welcome")
})
app.get("/", async (req, res) => {
    const snapshot = await User.get();
    console.log(snapshot)
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });
  

app.use(function(req, res, next) {
    var allowedDomains = ['http://localhost:3000','http://localhost:8000','https://e484-122-187-31-178.ngrok.io','https://c3e6-122-187-31-178.ngrok-free.app' ];
  var origin = req.headers.origin;
  if(allowedDomains.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
  });

app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const snapshot = await User.get();
        console.log(snapshot)
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const check="notexist"
        for (i in list) {
            if(list[i].data.email==email && list[i].data.password==password){
                res.json("exist")
            }
        }
        res.json("notexist")

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
         const snapshot = await User.get();
        console.log(snapshot)
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const check="notexist"
        for (i in list) {
            if(list[i].data.email==email && list[i].data.password==password){
                res.json("exist")
            }
        }
        await User.add({data})
        res.json("notexist")
    }
    catch(e){
        res.json("fail")
    }

})
app.options("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
  });
app.listen(8000,()=>{
    console.log("port connected");
})

