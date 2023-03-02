const fs = require("fs");
const File = require("../models/File");
const config = require("config");

class FileService {
  createDir(file) {
    const filePath = `${config.get("fillPath")}\\${file.user}\\${file.path}`;
    return new Promise((res, rej) => {
      try {
        //если файл по такому пути существует то создаем папку
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return res({ message: "File was created" });
        } else {
          return res({ message: "File already exist" });
        }
      } catch (e) {
        return rej({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
