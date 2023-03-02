const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleweare/auth.middleware");
const fileController = require("../controllers/file.Controller");

router.post("", authMiddleware, fileController.createDir);
router.get("", authMiddleware, fileController.getFiles);

module.exports = router;
