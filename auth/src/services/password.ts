import { scrypt, randomBytes } from "node:crypto";

import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(4).toString("hex");

    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf}.${salt}`;
  }
}
