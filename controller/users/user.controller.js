const {getUsers, getUserById, getUserByUsernameOrEmail, createUser, updateUser, deleteUser} = require("../../service/users/user.service");
const {genSaltSync, hashSync, compareSync, compare} = require("bcrypt");
const {sign} = require("jsonwebtoken");

module.exports = {

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Records found",
                data: results
            });
        });

    },

    getUserById: (req, res) => {
        const id = req.params.id;

        getUserById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Records found",
                data: results
            });
        });
    },

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User created successfully.",
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "Failed to update user."
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User updated successfully.",
                data: results
            });
        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;

        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User deleted successfully.",
                data: results
            });
        });
    },

    getAuthToken: (req, res) => {
        const body = req.body;

        getUserByUsernameOrEmail(body.username, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: "Invalid credentials"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonToken = sign(
                    {result: results},
                    process.env.PASS_ENCRYPT_KEY,
                    {
                        expiresIn: "1h"
                    },
                    {}
                );
                return res.status(200).json({
                    success: 1,
                    message: "Token generated successfully",
                    accessToken: jsonToken
                });
            } else {
                return res.status(200).json({
                    success: 0,
                    message: "Invalid credentials"
                });
            }
        });
    }
}
