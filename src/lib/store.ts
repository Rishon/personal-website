import fs from "fs";
import path from "path";

// Reads a disposable JSON file from the app root and falls back to the given shape
export function readStore<T extends object>(file: string, fallback: T): T {
  try {
    const target = path.join(process.cwd(), file);
    if (!fs.existsSync(target)) return { ...fallback };
    return { ...fallback, ...JSON.parse(fs.readFileSync(target, "utf8")) };
  } catch {
    return { ...fallback };
  }
}

// Writes a disposable JSON file and swallows failures since the data is rebuilt by the next push
export function writeStore(file: string, value: object): void {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), file),
      JSON.stringify(value),
      "utf8",
    );
  } catch {}
}
