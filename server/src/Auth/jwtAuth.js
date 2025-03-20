const jwt = require("jsonwebtoken");

// generate jwt token
function generateJwt(user) {
    const payload = {
        regEmail: user.regEmail,
        userId: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
    return token;
}

//verify jwt token
function verifyJwt(req, res, next) {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            return res.status(403).json({ message: "No Token is Provided" });
        }
        const token = authorization.split(" ")[1];
        // console.log("auth token", token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded)

        // get payload from token. We can use req.user in next function
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "No Token is Verified" });
    }
}

module.exports = {
    generateJwt,
    verifyJwt,
};

