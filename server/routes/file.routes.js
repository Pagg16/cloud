const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleweare/auth.middleware");
const fileController = require("../controllers/file.Controller");

router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.get("", authMiddleware, fileController.getFiles);
router.get("/download", authMiddleware, fileController.downloadFile);
router.delete("/delete", authMiddleware, fileController.deleteFile);
router.get("/search", authMiddleware, fileController.searchFile);

module.exports = router;
