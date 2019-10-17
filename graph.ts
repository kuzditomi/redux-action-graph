import * as ts from "typescript";
import * as glob from "glob";
import { getActionPairs } from "./src/actionVisitor";

const sourceFilePath = process.argv[2] as string;

if (!sourceFilePath.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

let sourceFilePaths = glob.sync(sourceFilePath);

// create a program instance
const program = ts.createProgram(sourceFilePaths, {});

const actionPairs = getActionPairs(program)

console.log(actionPairs);
