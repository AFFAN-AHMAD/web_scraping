const express = require("express");
const app = express();
const port = 8080;
const webdriver = require("selenium-webdriver");
const { Builder, By, Browser } = require("selenium-webdriver");
const chromedriver = require("chromedriver");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const axios = require("axios");

let count = 0;
async function getData() {
  let driver;
  try {
    // driver
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    // url to locate
    await driver.get("https://food.grab.com/sg/en/");
    // searchbar
    const searchBar = await driver.findElement(By.id("location-input"));
    // enter data in the search bar
    await searchBar.sendKeys(
      "171 Kampong Ampat - 171 Kampong Ampat, Singapore, 368330"
    );

    // click the search button
    const searchButton = await driver.findElement(
      By.className("ant-btn submitBtn___2roqB ant-btn-primary")
    );
    //  click the button
    await searchButton.click();

    let extractedData = await driver
      .findElement(By.id("__NEXT_DATA__"))
      .getAttribute("innerHTML")
      .then((data) => {
        let parsedData = JSON.parse(data);
        // console.log(parsedData);

        let dataRequired =
          parsedData.props.initialReduxState.pageHomeV2.promotions;
        console.log(dataRequired);
        dataRequired.forEach((ele) => {
          let obj = {};
          obj.title = ele.name;
          obj.lat = ele.latitude;
          obj.lon = ele.longitude;
          console.log("ele", ele);
          console.log("obj", obj);

          // pushing data using localhost to db.json
          axios.post("http://localhost:7060/data", obj);
        });
      });
    let loadmore = await driver.findElement(By.className(ant - btn - block));
    if (loadmore || count > 5) {
      getData();
      count++;
    } else {
      return;
    }
    //
  } catch (err) {
    console.log("err", err);
  } finally {
    await driver.quit();
    console.log("finally");
  }
}
getData()
