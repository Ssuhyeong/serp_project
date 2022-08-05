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
                                return res.status(500).json({ registerSuccess: false, mesage: "비밀번호 해쉬화에 실패앴습니다." });
                        }

                        bcrypt.hash(user['user_password'], salt, async (err, hash) => {
                                if (err) {
                                        return res.status(500).json({ registerSuccess: false, message: "비밀번호 해쉬화에 실패했습니다." });
                                }

                                // 앞서 설정한 member json의 member_password값을 해쉬된 값으로 대체
                                user["user_password"] = hash

                                // 회원 데이터 등록
                                Account.create(
                                        user
                                ).then((data) => {
                                        res.send("signUpComplete")
                                });
                        })
                })
        }
}