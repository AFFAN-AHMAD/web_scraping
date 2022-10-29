const express = require('express')
const app = express();
const port = 8080;

const webdriver = require("selenium-webdriver");
const { Builder, By, Browser } = require("selenium-webdriver");
const chromedriver = require("chromedriver");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",async (req,res)=>{
    try{
        const data = await getData();
        res.send(data)
    }catch(error){
        console.log("err",error)
    }
})

async function getData(){

    try{
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("https://food.grab.com/sg/en/");

        const searchBar = await driver.findElement(By.id("location-input"));
        if(searchBar){
            return true
        }else{
            return false
        }
    }catch(err){
        console.log("err",err)
    }

}


app.listen(port,()=>{console.log(`server is running on http://localhost:${port}`);}) 