const { generateJwt } = require("../../Auth/jwtAuth");
const UserModel = require("../../Models/UserModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    try {
        const { regEmail, password } = req.body;

        if (!regEmail || !password) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        //check if use already exists or not
        const user = await UserModel.findOne({ regEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist",
            });
        }

        //comparing the passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ message: "Invalid credentials", success: false });
        }

        //password matched, now lets generate jwt token
        const token = await generateJwt(user);


        // user details while he registered except password -in client I can create state and get the userinfo wherever i want to
        const userInfo = user.toObject();
        delete userInfo.password;

        return res.status(200).json({
            success: true,
            token,
            userInfo,
            message: "Login Successful",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Login failed due to ${error.message}`,
        });
    }
};
module.exports = loginUser;