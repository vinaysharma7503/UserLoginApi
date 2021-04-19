const user_Data = require('../models/user_DataSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userLogin = async(req, res) => {
    const data = req.body;
    const data4mDb = req.userO
    const isMatched = await bcrypt.compare(data.password, data4mDb.password);

    if (isMatched) {

        jwt.sign({ email: data.email }, "vinay", { expiresIn: '24h' }, async(err, token) => {
            const userverify = await jwt.verify(token, "vinay")
            if (err) {
                next(err)
            }

            await user_Data.updateOne({ _id: data4mDb._id }, { auth_l_token: token, updated_on: new Date() }, (err, doc) => {
                if (err) {
                    return res.status(400).json({ msg: "Error Occur", status: err })
                } else {
                    res.status(200).json({
                        data: doc,
                        message: "Logged in Successfully"
                    });
                }
            });

        });

    } else {
        res.status(401).json({ message: "invalid username or password" })
    }

}


exports.userRegistration = async(req, res, next) => {
    const data = req.body
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(`this current password is ${data.password}`);

    jwt.sign({ email: data.email }, "vinay", async(err, token) => {
        if (err) {
            next(err)
        }

        const registration = new user_Data({
            name: data.name,
            email: data.email,
            phone: data.phone,
            username: data.username,
            password: hashedPassword,
            auth_r_token: token,
            created_on: new Date()
        });

        await registration.save((err, result) => {
            if (err) {
                return res.status(400).json({ msg: "Error Occur", status: err })
            } else {
                res.status(201).json({ msg: "Add User Successfully", status: result });
            }
        });
    });



}