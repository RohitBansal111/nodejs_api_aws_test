import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Country, State, City } from "country-state-city";

const app = express();
const PORT = process.env.PORT || 4022;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getAllCountry", (req, res) => {
  let data = Country.getAllCountries();
 // console.log(data)
  var requiredfield = ["name", "phonecode","timezones", "flag"];//isoCode currency latitude longitude timezones
  const final_data = data.map((val) => {
    let obj = {};
    requiredfield.map((field) => {
      obj[field] = val[field];
    });
    return obj;
  });
  res.send(final_data);
});
app.use('/getAllStates',(req,res)=>{
    const data  = State.getAllStates()
     // console.log(data)
  var requiredfield = ["name"];//isoCode  latitude longitude 
  const final_data = data.map((val) => {
    let obj = {};
    requiredfield.map((field) => {
      obj[field] = val[field];
    });
    return obj;
  });
  res.send(final_data);
})  
app.use('/getAllCities',(req,res)=>{
    const data  = City.getAllCities()
  var requiredfield = ["name",'stateCode'];//countryCode stateCode latitude longitude 
  const final_data = data.map((val) => {
    let obj = {};
    requiredfield.map((field) => {
      obj[field] = val[field];
    });
    return obj;
  });
  res.send(final_data);
})  
 
app.post('/getStateByCodeAndCountry',async(req,res)=>{
    try {
        const {stateCode, countryCode}=req.body
        const response = State.getStateByCodeAndCountry(stateCode,countryCode)
        res.send(response);
    } catch (error) {
        res.send(error)
    }
 
})  
 
app.post('/getStatesOfCountry',async(req,res)=>{
    try {
        const data  = State.getStatesOfCountry(req.body.countryCode)
//  console.log(data)
//  var requiredfield = ["name"];//isoCode  latitude longitude 
//  const final_data = data.map((val) => {
//    let obj = {};
//    requiredfield.map((field) => {
//      obj[field] = val[field];
//    });
//    return obj;
//  });
 
 res.send(data);
    
    } catch (error) {
       res.send(error) 
    }
  })  
   
  app.post('/getCitiesOfState',async(req,res)=>{
  try {
    const {stateCode, countryCode}=req.body
    const data  =City.getCitiesOfState(countryCode,stateCode)
  
 res.send(data);
  } catch (error) {
    res.send(error);
  }
  })  
  
  app.post('/getCitiesOfCountry',(req,res)=>{
    try {
      const {countryCode}=req.body
      const data  =City.getCitiesOfCountry(countryCode)
   res.send(data);
    } catch (error) {
      res.send(error);
    }

  })  

 
app.use("/", (req, res) => res.send("Backend working fine"));

app.listen(PORT, () => {
  console.log(`SERVER running on ${PORT}`);
});
