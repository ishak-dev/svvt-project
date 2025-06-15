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

describe("Appointment Booking", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:5174");
    // Wait for the page to load completely
    await driver.wait(until.elementLocated(By.css("body")), 10000);
  });

  it("should navigate to appointment page and fill the form", async () => {
    // Wait for and click the appointment link in navbar
    const appointmentLink = await driver.wait(
      until.elementLocated(By.css("[data-testid='appointment-link']")),
      10000
    );
    await appointmentLink.click();

    // Wait for the appointment form to load
    await driver.wait(
      until.elementLocated(By.css("[data-testid='appointment-form']")),
      10000
    );

    // Fill in the form
    await driver
      .findElement(By.css("[data-testid='name-input']"))
      .sendKeys("John Doe");
    await driver
      .findElement(By.css("[data-testid='email-input']"))
      .sendKeys("john@example.com");
    await driver
      .findElement(By.css("[data-testid='phone-input']"))
      .sendKeys("1234567890");

    // Select a date
    const dateInput = await driver.findElement(
      By.css("[data-testid='date-input']")
    );
    await dateInput.sendKeys("2024-04-01");

    // Select a time slot
    const timeSlot = await driver.findElement(
      By.css("[data-testid='time-input']")
    );
    await timeSlot.sendKeys("10:00");

    // Submit the form
    const submitButton = await driver.findElement(
      By.css("[data-testid='submit-button']")
    );
    await submitButton.click();

    // Wait for success message or confirmation
    const successMessage = await driver.wait(
      until.elementLocated(By.css("[data-testid='success-message']")),
      10000
    );

    expect(await successMessage.getText()).toContain(
      "Appointment booked successfully"
    );
  }, 30000);
});
