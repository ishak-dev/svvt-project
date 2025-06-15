CREATE TABLE IF NOT EXISTS appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_date VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    notes VARCHAR(255),
    patient_name VARCHAR(255),
    patient_surname VARCHAR(255),
    time VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS appointment_availability (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
); 