const db = require('../models');
const Account = db.account;

const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


exports.signIn = async (req, res) => {
        if (req.method == "GET") {
                const userEmail = req.query['user_email']
                const UserPwd = req.query['user_password']

                try {
                        Account.findOne({
                                where: { 'user_email': userEmail },
                        }).then((res_user) => {
                                if (!res_user) {
                                        return res.status(400).send({ message: 'Please check your email and password' });
                                } else {
                                        bcrypt.compare(UserPwd, res_user.user_password, (err, bcrypt_res) => {
                                                if (!bcrypt_res) {
                                                        return res.status(400).send({ message: 'Invalid password' });
                                                } else {
                                                        const access_token = jwt.sign({ userEmail: res_user.user_email }, config.secret, { expiresIn: 86400, });
                                                        return res.send({ access_token })
                                                }
                                        })
                                }
                        })
                } catch (err) {
                        console.error(err);
                        return res.status(500).send({ message: 'Internal server error' });
                }

        }
}


exports.signUp = (req, res) => {

        if (req.method == "POST") {
                
                let data = req.body
                let user = {
                        "user_email": data["user_email"],
                        "user_password": data["user_password"],
                }
                bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                                return res.status(500).json({ registerSuccess: false, mesage: "???????????? ???????????? ??????????????????." });
                        }

                        bcrypt.hash(user['user_password'], salt, async (err, hash) => {
                                if (err) {
                                        return res.status(500).json({ registerSuccess: false, message: "???????????? ???????????? ??????????????????." });
                                }

                                // ?????? ????????? member json??? member_password?????? ????????? ????????? ??????
                                user["user_password"] = hash

                                // ?????? ????????? ??????
                                Account.create(
                                        user
                                ).then((data) => {
                                        res.send("signUpComplete")
                                });
                        })
                })
        }
}