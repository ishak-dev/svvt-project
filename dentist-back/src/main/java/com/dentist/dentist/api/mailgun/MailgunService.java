package com.dentist.dentist.api.mailgun;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class MailgunService {

    @Value("${mailgun.api-key}")
    private String apiKey;

    @Value("${mailgun.base-url}")
    private String baseUrl;

    @Value("${mailgun.domain}")
    private String domain;

    private final RestTemplate restTemplate;

    public MailgunService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendEmail(String to, String subject, String text) {
        String url = String.format("%s/v3/%s/messages", baseUrl, domain);

        // Create form data
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("from", "Your Dental Office <mailgun@" + domain + ">");
        formData.add("to", to);
        formData.add("subject", subject);
        formData.add("text", text);

        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth("api", apiKey);
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        // Create request entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);

        // Send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to send email: " + response.getBody());
        }
    }
}
