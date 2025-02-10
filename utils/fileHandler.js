const fs = require("fs");
const path = require("path");
const log = require("../utils/logger");

const filePath = path.join(__dirname, "../temp-users.json");

const readUsers = () => {
  try {
    if (!fs.existsSync(filePath)) {
      log.warn("[fileHandler][readUsers] File not found, initializing empty user list.");
      return [];
    }

    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);

    if (!parsedData.users || !Array.isArray(parsedData.users)) {
      log.error("[fileHandler][readUsers] Invalid file structure, resetting users.");
      return [];
    }

    log.info("[fileHandler][readUsers] Users successfully loaded.");
    return parsedData.users;
  } catch (error) {
    log.error("[fileHandler][readUsers] Error reading file:", error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));
    log.info(`[fileHandler][writeUsers] Successfully wrote ${users.length} users to file.`);
  } catch (error) {
    log.error("[fileHandler][writeUsers] Error writing file:", error);
  }
};

module.exports = { readUsers, writeUsers };
