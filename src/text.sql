CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY ,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  profile_picture TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id UUID PRIMARY KEY ,
  user_id INTEGER NOT NULL REFERENCES users(id),
  event_name VARCHAR(255),
  event_datetime TIMESTAMP,
  location VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 
-- CREATE TABLE events (
--   id UUID PRIMARY KEY,
--   user_id UUID NOT NULL REFERENCES users(id),
--   event_name VARCHAR(255),
--   event_datetime TIMESTAMP,
--   location VARCHAR(255),
--   description TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- ); 
CREATE TABLE invitees (
    id UUID PRIMARY KEY ,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accept', 'maybe', 'no', 'busy')),
    qr_code VARCHAR(255),
    is_checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP,
    is_checked_out BOOLEAN DEFAULT FALSE,
    checked_out_at TIMESTAMP,
    gift_money NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);