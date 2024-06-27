CREATE TABLE Books (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title VARCHAR(50) NOT NULL UNIQUE, -- Title is required and unique (cannot be NULL)
  author VARCHAR(50) NOT NULL -- Author is required (cannot be NULL)
);

-- Insert data into Books table
INSERT INTO Books (title, author)
VALUES
  ('The Lord of the Rings', 'J.R.R. Tolkien'),
  ('Pride and Prejudice', 'Jane Austen');

CREATE TABLE Users (
	id INT PRIMARY KEY IDENTITY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(50) NOT NULL UNIQUE
);

--Junction Table
CREATE TABLE UserBooks (
  id INT PRIMARY KEY IDENTITY,
  user_id INT FOREIGN KEY REFERENCES Users(id),
  book_id INT FOREIGN KEY REFERENCES Books(id)
);

-- Insert sample books
INSERT INTO Books (title, author)
VALUES
  ('To Kill a Mockingbird', 'Harper Lee'),
  ('The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams'),
  ('Dune', 'Frank Herbert'),
  ('The Great Gatsby', 'F. Scott Fitzgerald');

-- Insert sample users
INSERT INTO Users (username, email)
VALUES
  ('user1', 'user1@example.com'),
  ('user2', 'user2@example.com'),
  ('user3', 'user3@example.com');

-- Insert relationships between users and books
INSERT INTO UserBooks (user_id, book_id)
VALUES
  (1, 1),  -- User 1 has book 1
  (1, 2),  -- User 1 has book 2
  (1, 4),  -- User 1 has book 4
  (2, 3),  -- User 2 has book 3
  (2, 5),  -- User 2 has book 5
  (3, 1),  -- User 3 has book 1
  (3, 6);  -- User 3 has book 6

DROP TABLE UserBooks;
DROP TABLE Users;
DROP TABLE Books;

SELECT SCOPE_IDENTITY AS id;