const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleweare/auth.middleware");
const fileController = require("../controllers/file.Controller");

router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.get("", authMiddleware, fileController.getFiles);
router.post("/download", authMiddleware, fileController.downloadFile);
router.post("/delete", authMiddleware, fileController.deleteFile);

module.exports = router;
