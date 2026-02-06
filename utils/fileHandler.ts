import fs from 'fs';
import path from 'path';
import { logger as log } from './logger';
import { User } from '../types/userType';
 
const filePath = path.join(__dirname, '../temp-users.json');

export const readUsers = () => {
  try {
    if (!fs.existsSync(filePath)) {
      log.warn('[fileHandler][readUsers] File not found, initializing empty user list.');
      return [];
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(parsedData)

    if (!parsedData.users || !Array.isArray(parsedData.users)) {
      log.error('[fileHandler][readUsers] Invalid file structure, resetting users.');
      return [];
    }
    log.info('[fileHandler][readUsers] Users successfully loaded.');
    return parsedData.users;
  } catch (error) {
    log.error('[fileHandler][readUsers] Error reading file:', error);
    return [];
  }
};

export const writeUsers = (users: Array<User>) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));
    log.info(`[fileHandler][writeUsers] Successfully wrote ${users.length} users to file.`);
  } catch (error) {
    log.error('[fileHandler][writeUsers] Error writing file:', error);
  }
};
