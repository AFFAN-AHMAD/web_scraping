const express = require("express");
const app = express();
const port = 8080;

const webdriver = require("selenium-webdriver");
const { Builder, By, Browser } = require("selenium-webdriver");
const chromedriver = require("chromedriver");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await getData();
    res.send(data);
  } catch (error) {
    console.log("err", error);
  }
});

async function getData() {
  let driver;
  try {
    // driver
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .build();
    // url to locate
    await driver.get("https://food.grab.com/sg/en/");
    // searchbar
    const searchBar = await driver.findElement(By.id("location-input"));
    // enter data in the search bar
    await searchBar.sendKeys("Kampong");

    // click the search button
    const searchButton = await driver.findElement(
      By.className("ant-btn submitBtn___2roqB ant-btn-primary")
    );
    //  click the button
    await searchButton.click();

      let loadMore = await driver.findElement(
        By.className("ant-btn ant-btn-block")
      )
      await loadMore.click()
    if (loadMore) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    // await driver.quit()
    console.log("finally");
  }
}


app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
