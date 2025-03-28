CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE color AS ENUM ('grey', 'yellow', 'orange', 'pink', 'purple', 'blue', 'green');
CREATE TYPE kanban_category AS ENUM ('to-do', 'in progress', 'done');
CREATE TYPE mood_level AS ENUM ('great', 'good', 'meh', 'angry', 'sad', 'sleepy');
CREATE TYPE sleep_quality AS ENUM ('good', 'normal', 'bad');
CREATE TYPE priority_level AS ENUM ('undefined', 'high', 'medium', 'low');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email CITEXT NOT NULL UNIQUE,
	salt TEXT NOT NULL, 
	hashed_password TEXT NOT NULL,
	reset_password_token TEXT,
	reset_token_expiration TIMESTAMP WITH TIME ZONE,
	username TEXT NOT NULL DEFAULT 'new user',
	profile_picture TEXT,
	role user_role NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE preferences (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL UNIQUE,
	theme TEXT,
	language TEXT,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE to_do_lists (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	sortOrder INTEGER,
	pinned BOOLEAN DEFAULT FALSE,
	color color NOT NULL DEFAULT 'grey',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	to_do_list_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	sortOrder INTEGER,
	description TEXT,
	due_date DATE,
	priority priority_level DEFAULT 'undefined',
	kanban_category kanban_category NOT NULL DEFAULT 'to-do',
	done BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (to_do_list_id) REFERENCES to_do_lists(id) ON DELETE CASCADE
);

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	name CITEXT NOT NULL UNIQUE,
	color color NOT NULL DEFAULT 'grey',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	UNIQUE (user_id, name)
);

CREATE TABLE task_tags (
	task_id INTEGER NOT NULL,
	tag_id INTEGER NOT NULL,
	FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    	FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    	PRIMARY KEY (task_id, tag_id)
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	description TEXT,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	start_time TIME,
	end_time TIME,
	color color NOT NULL DEFAULT 'grey',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	CHECK (end_date > start_date OR (end_date = start_date AND end_time > start_time))
);

CREATE TABLE habits (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	name TEXT NOT NULL,
	archived BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE (user_id, name)
);

CREATE TABLE habit_data (
	id SERIAL PRIMARY KEY,
	habit_id INTEGER NOT NULL,
	completed BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);

CREATE TABLE water (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	amount_cups INTEGER NOT NULL,
	recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	CHECK (amount_cups >= 0),
	UNIQUE(user_id, recorded_at)
);

CREATE TABLE sleep (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	sleep_start TIMESTAMP WITH TIME ZONE NOT NULL,
	sleep_end TIMESTAMP WITH TIME ZONE NOT NULL,
	quality sleep_quality NOT NULL,
	recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	CHECK (sleep_end > sleep_start),
	UNIQUE(user_id, recorded_at)
);

CREATE TABLE mood (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	mood mood_level NOT NULL,
	recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE(user_id, recorded_at)
);

CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	body TEXT NOT NULL,
	color color DEFAULT 'grey',
	pinned BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);