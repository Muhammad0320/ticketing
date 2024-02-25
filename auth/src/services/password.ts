import { scrypt } from "node:crypto";

import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {}
