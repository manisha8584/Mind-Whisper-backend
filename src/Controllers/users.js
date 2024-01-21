const users = require("../models/user")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body
    console.log(req.body);

    const eUser = await users.findOne({ email })
    if (!eUser) {
        const _user = new users({
            name, email, phone, password
        })

        _user.save().then(newUser => {
            return res.status(201).json({ message: "Account Created Succesfully" })
        })
            .catch(error => {
                return res.status(400).json({ message: "Error occured", error })

            })
    } else {
        res
            .status(400).json({
                message: "User Already Exists"
            })
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body

    const eUser = await users.findOne({ email })
    if (eUser) {
        if (eUser.authenticate(password)) {
            const token = jwt.sign({ id: eUser._id }, "MyAPPSECRET", { expiresIn: "24h" })

            return res.status(200).json({
                message: "Login sucess", token, isSuccess: true
            })

        }
        else {
            return res
                .status(401).json({
                    message: "Unauthorized"
                })
        }



    } else {
        return res
            .status(404).json({
                message: "User not found Please signup"
            })
    }
}
exports.findUser = async (req, res) => {
    const user = await users.findById(req.id)
    return res.status(200).json({ user })
}