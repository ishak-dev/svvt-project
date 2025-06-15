package com.dentist.dentist.rest.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Dental Office",
                version = "1.0.0",
                description = "Dental office backend app",
                contact = @Contact(name = "Ishak Kazic", email = "ishak.kazic@gmail.com")
        ),
        servers = {
                @Server(url = "/", description = "DEfault Server URL")
        }
)
//localhost:8080/swagger-ui/index.html
public class ConfigurationSwagger {

}


