CREATE TABLE IF NOT EXISTS jobs (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  company_name VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  job_location VARCHAR(50) NOT NULL DEFAULT "work from home",
  designation VARCHAR(40) NOT NULL,
  eligibility_criteria DECIMAL(2, 1),
  target_audience VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
