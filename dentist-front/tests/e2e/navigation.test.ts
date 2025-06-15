import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome.js";

let driver: WebDriver;

beforeAll(async () => {
  const options = new ChromeOptions();
  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}, 20000);

afterAll(async () => {
  if (driver) await driver.quit();
});

describe("Website Navigation", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:5174");
    // Wait for the page to load completely
    await driver.wait(until.elementLocated(By.css("body")), 10000);
  });

  it("should load the home page with all main sections", async () => {
    // Check if hero section is present
    const heroSection = await driver.wait(
      until.elementLocated(By.css("[data-testid='hero-section']")),
      10000
    );
    expect(await heroSection.isDisplayed()).toBeTruthy();

    // Check if services section is present
    const servicesSection = await driver.wait(
      until.elementLocated(By.css("[data-testid='services-section']")),
      10000
    );
    expect(await servicesSection.isDisplayed()).toBeTruthy();

    // Check if about section is present
    const aboutSection = await driver.wait(
      until.elementLocated(By.css("[data-testid='about-section']")),
      10000
    );
    expect(await aboutSection.isDisplayed()).toBeTruthy();
  }, 30000);

  it("should navigate through main menu items", async () => {
    // Click on Services link
    const servicesLink = await driver.wait(
      until.elementLocated(By.css("[data-testid='services-link']")),
      10000
    );
    await servicesLink.click();
    await driver.wait(until.urlContains("services"), 10000);

    // Click on About link
    const aboutLink = await driver.wait(
      until.elementLocated(By.css("[data-testid='about-link']")),
      10000
    );
    await aboutLink.click();
    await driver.wait(until.urlContains("about"), 10000);

    // Click on Articles link
    const articlesLink = await driver.wait(
      until.elementLocated(By.css("[data-testid='articles-link']")),
      10000
    );
    await articlesLink.click();
    await driver.wait(until.urlContains("articles"), 10000);
  }, 30000);

  it("should have a working footer with contact information", async () => {
    const footer = await driver.wait(
      until.elementLocated(By.css("[data-testid='footer']")),
      10000
    );

    // Scroll to footer
    await driver.executeScript("arguments[0].scrollIntoView(true);", footer);

    // Check if contact information is present
    const contactInfo = await driver.wait(
      until.elementLocated(By.css("[data-testid='contact-info']")),
      10000
    );
    expect(await contactInfo.isDisplayed()).toBeTruthy();

    // Check if social media links are present
    const socialLinks = await driver.findElements(
      By.css("[data-testid='social-link']")
    );
    expect(socialLinks.length).toBeGreaterThan(0);
  }, 30000);
});
