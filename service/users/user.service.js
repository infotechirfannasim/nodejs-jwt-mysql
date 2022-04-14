const dbPool = require("../../config/database");

module.exports = {
    getUsers: callback => {
        dbPool.query(
            `SELECT id, first_name, last_name, email, username FROM users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            });
    },

    getUserById: (id, callback) => {
        dbPool.query(
            `SELECT id, first_name, last_name, email, username FROM users WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0])
            });
    },

    getUserByUsernameOrEmail: (usernameEmail, callback) => {
        dbPool.query(
            `SELECT * FROM users WHERE email = ? or username = ?`,
            [
                usernameEmail,
                usernameEmail
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0])
            });
    },

    createUser: (data, callBack) => {
        dbPool.query(
            `INSERT INTO users(first_name, last_name, email, username, password)
            VALUES (?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            });
    },

    updateUser: (data, callBack) => {
        dbPool.query(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, username = ?, password = ? WHERE id = ?`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.username,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            });
    },

    deleteUser: (id, callBack) => {
        dbPool.query(
            `DELETE FROM users  WHERE id = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            });
    },

};
