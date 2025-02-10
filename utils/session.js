const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    console.log(JSON.stringify(user))
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = { generateToken };