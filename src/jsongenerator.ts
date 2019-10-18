import { ActionPair } from "./actionVisitor";
import * as fs from "fs";

export function generateJson(actionPairs: ActionPair[], path: string) {
  try {
    fs.writeFileSync(path, JSON.stringify(actionPairs));
  } catch (err) {
    console.error(err);
  }
}
