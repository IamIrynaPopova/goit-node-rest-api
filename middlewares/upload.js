const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    console.log(file);
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    console.log(originalname);
    const filename = `${uniquePreffix}_${originalname}`;
    console.log(filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
