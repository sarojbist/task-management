const bcrypt = require("bcrypt");
const UserModel = require("../../Models/UserModel");
const registerUser = async (req, res) => {
    try {
        const { regName, regEmail, password } = req.body;
        // fields should not be empty
        if (
            !regName || !regEmail || !password
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // checking existing user
        const existingUser = await UserModel.findOne({ regEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // hashing password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Hashing pasword error",
            });
        }

        // creating user model instance
        const user = new UserModel({
            regName,
            regEmail,
            password: hashedPassword,
        })
        user.save();

        return res.status(200).json({
            success: true,
            user,
            message: "User created successfully",
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Register user failed due to: ${err.message}`,
        });
    }
}
module.exports = registerUser;