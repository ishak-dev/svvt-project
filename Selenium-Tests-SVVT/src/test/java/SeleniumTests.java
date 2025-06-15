import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.JavascriptExecutor;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SeleniumTests {

    private WebDriver driver;
    private WebDriverWait wait;
    private JavascriptExecutor js;

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(7));
        js = (JavascriptExecutor) driver;
    }

    @Test
    public void testPageLoad() {
        // Navigate to the page
        driver.get("http://localhost:5173/");
        
        // Wait for the page to load (wait for body to be present)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Get the page title
        String pageTitle = driver.getTitle();
        System.out.println("Page title: " + pageTitle);
        
        // Get the current URL
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: " + currentUrl);
        
        // Verify that we're on the correct page
        assertTrue(currentUrl.contains("localhost:5173"), "Should be on the correct page");
    }

    @Test
    public void testAppointmentBooking() {
        // Navigate to the page
        driver.get("http://localhost:5173/");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Scroll to the appointment section
        WebElement appointmentSection = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='appointment']/div[1]"))
        );
        js.executeScript("arguments[0].scrollIntoView(true);", appointmentSection);
        
        // Wait a bit for the scroll to complete
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Click the calendar button
        WebElement calendarButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='appointment']/div[1]/div/div[2]/div/div/div/div[2]/button[22]")
            )
        );
        calendarButton.click();
        
        // Click the next button
        WebElement nextButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='appointment']/div[2]/div/button")
            )
        );
        nextButton.click();
        
        // Fill in the form
        WebElement nameInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='appointment']/div[3]/div/form/div[1]/input")
            )
        );
        nameInput.sendKeys("John");
        
        WebElement surnameInput = driver.findElement(
            By.xpath("//*[@id='appointment']/div[3]/div/form/div[2]/input")
        );
        surnameInput.sendKeys("Doe");
        
        WebElement emailInput = driver.findElement(
            By.xpath("//*[@id='appointment']/div[3]/div/form/div[3]/input")
        );
        emailInput.sendKeys("john.doe@example.com");
        
        WebElement notesInput = driver.findElement(
            By.xpath("//*[@id='appointment']/div[3]/div/form/div[4]/input")
        );
        notesInput.sendKeys("Test appointment");
        
        // Click confirm button
        WebElement confirmButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='appointment']/div[3]/div/form/div[5]/button[2]")
            )
        );
        confirmButton.click();
        
        // Wait for confirmation (you might want to add an assertion here based on what happens after confirmation)
        try {
            Thread.sleep(2000); // Wait to see the result
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @Test
    public void testFetchingUsers() {
        // Navigate to the users page
        driver.get("http://localhost:5173/admin/users");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Wait for the table to be present
        WebElement tableBody = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/table/tbody")
            )
        );
        
        // Get all rows in the table
        List<WebElement> rows = tableBody.findElements(By.tagName("tr"));
        
        // Verify that there are exactly 3 rows
        assertEquals(3, rows.size(), "Table should contain exactly 3 users");
        
        // Print the content of each row for verification
        for (int i = 0; i < rows.size(); i++) {
            WebElement row = rows.get(i);
            System.out.println("User " + (i + 1) + ": " + row.getText());
        }
    }

    @Test
    public void testAddUser() {
        // Navigate to the users page
        driver.get("http://localhost:5173/admin/users");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Click the add user button
        WebElement addButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/div/button")
            )
        );
        addButton.click();
        
        // Wait for the form to be visible
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Fill in the user details
        WebElement nameInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/div[2]/input[1]")
            )
        );
        nameInput.sendKeys("Test User");
        
        WebElement emailInput = driver.findElement(
            By.xpath("//*[@id='root']/div/main/div/div[2]/input[2]")
        );
        emailInput.sendKeys("test.user@example.com");
        
        WebElement phoneInput = driver.findElement(
            By.xpath("//*[@id='root']/div/main/div/div[2]/input[3]")
        );
        phoneInput.sendKeys("1234567890");
        
        // Click save button
        WebElement saveButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/div[2]/button[1]")
            )
        );
        saveButton.click();
        
        // Wait for the save operation to complete
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Verify the new user was added by checking the table
        WebElement tableBody = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/table/tbody")
            )
        );
        
        List<WebElement> rows = tableBody.findElements(By.tagName("tr"));
        boolean userFound = false;
        
        for (WebElement row : rows) {
            if (row.getText().contains("Test User") && 
                row.getText().contains("test.user@example.com")) {
                userFound = true;
                break;
            }
        }
        
        assertTrue(userFound, "New user should be visible in the table");
    }

    @Test
    public void testSearchUser() {
        // Navigate to the users page
        driver.get("http://localhost:5173/admin/users");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Find and fill the search input
        WebElement searchInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/div[1]/input")
            )
        );
        searchInput.clear();
        searchInput.sendKeys("ishak@gmail.com");
        
        // Wait for 2 seconds for search results
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Get the table body
        WebElement tableBody = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/table/tbody")
            )
        );
        
        // Get the first result's email
        WebElement firstResultEmail = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/table/tbody/tr/td[2]")
            )
        );
        
        // Verify the email matches
        String foundEmail = firstResultEmail.getText();
        assertEquals("ishak@gmail.com", foundEmail, "Search result should match the searched email");
        
        // Print the result for verification
        System.out.println("Found email: " + foundEmail);
    }

    @Test
    public void testAddFreeSlot() {
        // Navigate to the add free slot page
        driver.get("http://localhost:5173/admin/add-free-slot");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Fill in the date
        WebElement dateInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("date"))
        );
        dateInput.clear();
        dateInput.sendKeys("15.06.2024");
        
        // Fill in the start time
        WebElement startTimeInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("start-time"))
        );
        startTimeInput.clear();
        startTimeInput.sendKeys("19:45");
        
        // Fill in the end time
        WebElement endTimeInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("end-time"))
        );
        endTimeInput.clear();
        endTimeInput.sendKeys("20:45");
        
        // Click the submit button
        WebElement submitButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/form/button")
            )
        );
        submitButton.click();
        
        // Wait for the submission to complete
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Print confirmation
        System.out.println("Free slot added for date: 15.06.2024, from 19:45 to 20:45");
    }

    @Test
    public void testAddUserRecord() {
        // Navigate to the users page
        driver.get("http://localhost:5173/admin/users");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Click the record button for the first user
        WebElement recordButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/table/tbody/tr[1]/td[4]/button")
            )
        );
        recordButton.click();
        
        // Wait for the modal/form to appear
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Click the add record button
        WebElement addRecordButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[2]/button[1]")
            )
        );
        addRecordButton.click();
        
        // Fill in the title
        WebElement titleInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[1]/input")
            )
        );
        titleInput.clear();
        titleInput.sendKeys("Test Record Title");
        
        // Fill in the date
        WebElement dateInput = driver.findElement(
            By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[2]/input")
        );
        dateInput.clear();
        dateInput.sendKeys("15.06.2024");
        
        // Fill in the details
        WebElement detailsInput = driver.findElement(
            By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[3]/textarea")
        );
        detailsInput.clear();
        detailsInput.sendKeys("This is a test record with some details about the user's visit.");
        
        // Click save button
        WebElement saveButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[4]/button[2]")
            )
        );
        saveButton.click();
        
        // Wait for the save operation to complete
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Print confirmation
        System.out.println("Record added successfully for the first user");
    }

    @Test
    public void testFilterRecords() {
        // Navigate to the users page
        driver.get("http://localhost:5173/admin/users");
        
        // Wait for the page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
        
        // Add explicit wait of 3 seconds
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Click the record button for the first user
        WebElement recordButton = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id='root']/div/main/div/table/tbody/tr[1]/td[4]/button")
            )
        );
        recordButton.click();
        
        // Wait for the modal/form to appear
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Find and fill the filter input
        WebElement filterInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/div[2]/div/div[1]/input[1]")
            )
        );
        filterInput.clear();
        filterInput.sendKeys("Karijes");
        
        // Wait for filtering to complete
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Get the filtered result
        WebElement filteredResult = wait.until(
            ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[@id='root']/div/main/div/div[2]/div/ul/li/p[1]")
            )
        );
        
        // Verify the filtered result matches the input
        String resultText = filteredResult.getText();
        assertEquals("Karijes", resultText, "Filtered result should match the search input");
        
        // Print the result for verification
        System.out.println("Filtered result: " + resultText);
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
