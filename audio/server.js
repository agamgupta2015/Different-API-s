const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const img2aud = require("./routes/merge_image_and_audio");
const download = require("./routes/download_file");
const upl_file = require("./routes/upload_files");
const upl = require("./routes/file");
const txt = require("./routes/txt_speech");
const aud = require("./routes/merge_aud_and_video");
const jwt = require("./routes/jwt_token")

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || "localhost";
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function verifyAuthToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(400).send("Un-authorized to access data!");
        }

        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded) {
            next();
        } else {
            res.status(400).send("Invalid token!");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid token!");
    }
}

app.use("/api",img2aud);
app.use("/api",download);
app.use("/api",upl_file);
app.use("/api",upl);
app.use("/api",txt);
app.use("/api",aud);
app.use("/api",jwt);

app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we not have!")
);

app.use((err, req, res, next) => res.status(500).send("Something went wrong!"));

app.get("/",(req,res)=>{
    res.send("Server is Runing fine")
})


app.listen(PORT, () => {
    console.log(` Image to audio listening at http://${HOST}:${PORT}`);
});