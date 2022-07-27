CREATE TABLE IF NOT EXISTS jobs (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  company_name VARCHAR(30) NOT NULL,
  salary FLOAT NOT NULL,
  job_location VARCHAR(50) NOT NULL DEFAULT "not specified",
  designation VARCHAR(40) NOT NULL,
  eligibility_criteria VARCHAR(100),
  target_audience VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);