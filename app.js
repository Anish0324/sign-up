const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
 const https=require("https");
app.use(bodyparser.urlencoded({extended: true}));


app.use(express.static("public"));//to use css and image
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");

});


app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
const email=req.body.email;
  const data={
  members: [
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us13.api.mailchimp.com/3.0/lists/69727d3a4d";
const options={
    method:"POST",
    auth:"shettyani0308:e0601c2634d62e478202af11d0ca6701-us13"
}
const request=https.request(url,options,function(response){


    if(response.statusCode === 200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");

    }
 response.on("data",function(data){
      console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();




});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server running on port 3000");
});
