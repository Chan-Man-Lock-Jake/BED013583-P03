const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static async getAllUsers() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Users`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map((row) => new User(row.id, row.username, row.email)); // Convert rows to User objects
    }

    static async getUserById(id) {
        const sqlQuery = `SELECT * FROM Users WHERE id = @id`

        const request = connection.request();
        request.input("id", user.id);

        const result = await request.query(sqlQuery);
        
        connection.close();

        return result.recordset[0]
            ? new User(result.recordset[0].id, result.recordset[0].username, result.recordset[0].email)
        : null; // Handle user not found
    }

    static async createUser(newUser) {
        const connection = await sql.connect(dbConfig);
        
        const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id;`;

        const request = connection.request();
        request.input("username", newUser.username);
        request.input("email", newUser.email);

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve newly create user
        return this.getUserById(result.recordset[0].id);
    }

    static async updateUser(id, updatedUser) {
        const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`;
  
      const request = connection.request();
      request.input("id", id);
      request.input("title", updatedUser.username || null); // Handle optional fields
      request.input("author", updatedUser.email || null);
  
      await request.query(sqlQuery);
  
      connection.close();
  
      return this.getBookById(id); // returning the updated user data
    }

    static async deleteUser(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
    }  
}

module.exports = User;