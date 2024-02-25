import { scrypt, randomBytes } from "node:crypto";

import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(4).toString("hex");

    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [password, salt] = storedPassword.split(".");

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === password;
  }
}
