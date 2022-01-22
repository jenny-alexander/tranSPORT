
-- Create transport database
CREATE DATABASE "transport";

-- Create user table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    password character varying(1000) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100),
    player_name character varying(100),
    parent_name character varying(100),
    phone_number character varying(50)
);

-- Create team table
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_name character varying(100),
    parent_email character varying(100) NOT NULL
);

-- Create ride table
CREATE TABLE ride (
    id SERIAL PRIMARY KEY,
    pickup_location character varying(200),
    dropoff_location character varying(200),
    creator_id integer REFERENCES "user"(id),
    driver_id integer REFERENCES "user"(id),
    player_name character varying(100),
    ride_status character varying(50) DEFAULT 'Needs Driver!'::character varying,
    return_trip boolean,
    event_timestamp timestamp with time zone,
    game boolean,
    created_timestamp timestamp with time zone
);

-- Create comment table
CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    ride_id integer REFERENCES ride(id) ON DELETE CASCADE,
    text character varying(1000),
    user_id integer
);

--Create user_ride table (join table)
CREATE TABLE user_ride (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    ride_id integer REFERENCES ride(id) ON DELETE CASCADE
);