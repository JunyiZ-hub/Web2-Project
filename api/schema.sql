--PROG2002 A2 - Charity Events Database Schema
--Author: [Junyi Zhang]

DROP DATABASE IF EXISTS charityevents_db;

CREATE DATABASE charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE charityevents_db;


CREATE TABLE organisations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  contact_email VARCHAR(150),
  contact_phone VARCHAR(50)
);


CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);


CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location VARCHAR(255),
  price DECIMAL(10,2) DEFAULT 0.00,
  goal INT DEFAULT 0,
  progress INT DEFAULT 0,
  category_id INT,
  organisation_id INT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);

INSERT INTO organisations (name, description, contact_email, contact_phone) VALUES
('Hope Foundation', 'Dedicated to supporting families in need.', 'contact@hopefoundation.org', '0411 111 111'),
('Health For All', 'Raising funds for health research and care.', 'info@healthforall.org', '0422 222 222');

INSERT INTO categories (name) VALUES
('Gala Dinner'),
('Fun Run'),
('Auction'),
('Concert'),
('Community Fair');

INSERT INTO events (name, description, event_date, location, price, goal, progress, category_id, organisation_id, is_active) VALUES
('Charity Gala 2025', 'An elegant evening to raise funds for children’s education.', '2025-11-01', 'City Hall', 120.00, 15000, 3500, 1, 1, 1),
('Run for Hope', 'A 5km fun run to support cancer research.', '2025-10-15', 'Central Park', 25.00, 8000, 4200, 2, 2, 1),
('Silent Auction Autumn', 'Bid on donated items to raise funds for homeless shelters.', '2025-12-05', 'Community Centre', 0.00, 4000, 900, 3, 1, 1),
('Charity Concert', 'Enjoy performances from local bands supporting mental health programs.', '2025-10-20', 'Riverside Stage', 35.00, 6000, 1200, 4, 2, 1),
('Neighbourhood Fair', 'A family-friendly event with stalls and games to raise funds for local schools.', '2025-09-01', 'West Park', 0.00, 2000, 2000, 5, 1, 1),
('Summer Run 2025', '10km competitive run for youth wellbeing.', '2025-07-20', 'Harbour Road', 30.00, 10000, 10000, 2, 2, 1),
('Winter Gala (Suspended)', 'Event temporarily suspended for policy review.', '2025-12-20', 'Grand Hotel', 150.00, 20000, 5000, 1, 1, 0),
('Community Auction Fall', 'Local businesses donate products for charity bidding.', '2026-03-10', 'Town Hall', 0.00, 3000, 900, 3, 1, 1);