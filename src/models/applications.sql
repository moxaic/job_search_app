CREATE TABLE IF NOT EXISTS applications (
  user_id BINARY(16) NOT NULL,
  job_id BINARY(16) NOT NULL,
  applied_on DATE DEFAULT (NOW()),
  PRIMARY KEY (user_id, job_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);