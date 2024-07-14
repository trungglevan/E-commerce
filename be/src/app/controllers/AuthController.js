import connection from '../../config/db/index.js';
import User from '../models/User.js';
import bcrypt from "bcrypt";
import Auth from '../helpers/Auth.js';

class AuthController {
    async register(req, res) {
        // check if email is available
        const email = req.body.email; console.log(`Email: ${email}`);
        connection.connect().then(async (db) => {
            try {
                // check if email is already taken
                const result = await User.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    console.log('Email is already taken');
                    res.json({ message: 'Email is already taken' });
                } else {
                    // hashing password - saltRound = 10
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            console.error(`Error: ${err}`);
                        } else {
                            console.log(`Hash: ${hash}`);
                            // create new user
                            connection.connect().then(async (db) => {
                                console.log('Creating new user');
                                const user = new User(undefined, req.body.name, req.body.email, hash, req.body.role = "USER");
                                user.save(db).then((result) => {
                                    res.redirect('/login');
                                    console.log(`User created with ID: ${result.insertedId}`);
                                    // res.json(result);
                                });
                            });
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Email: ${email} | Password: ${password}`);
        connection.connect().then(async (db) => {
            try {
                const user = await User.findByEmail(db, email);
                console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            // create token
                            const token = Auth.createJWTToken(email);
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false, // false if not using https | true if using https
                                sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                maxAge: 3600000, // expired time, should set to match token expiry (1h)
                            });
                            res.cookie('id', user._id, {
                                httpOnly: true,
                                secure: false, // false if not using https | true if using https
                                sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                maxAge: 3600000, // expired time, should set to match token expiry (1h)
                            });
                            console.log('Login successful');
                            if (user.role === 'ADMIN') {
                                res.redirect('/admin/')
                            } else {
                                res.redirect('/')
                            }

                            // res.json({ message: 'Login successful', token: token, id: user._id });
                        } else {
                            console.log('Login failed');
                            res.json({ message: 'Login failed' });
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }

    async logOut(req, res) {
        if (req.cookies) {
            // Xóa cookie bằng cách thiết lập thời gian sống của nó thành 0
            res.clearCookie('token', { path: '/' }); // Đảm bảo path giống như lúc đặt cookie
            res.clearCookie('id', { path: '/' });
            console.log('Cookie đã được xóa');
            res.redirect('/');
        } else {
            res.send('Không có cookie để xóa');
        }
    }

    async account(req, res) {
        try {
            const db = await connection.connect();
            const result = await User.findAll(db);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthController;
