const {Router} = require("express");
const route = Router()
var jwt = require("jsonwebtoken");

route.post("/login", async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const payload = { username: username };
        let result;

        if (!username || !password) {
            result = "Invalid credentials";
            return;
        }

        result = await generateAuthToken(payload);
        res.json({ token: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 500,
    });
    return accessToken;
}
module.exports = route;