import * as ts from "typescript";
import * as glob from "glob";
import { getActionPairs } from "./src/actionVisitor";
import { generateJson } from "./src/jsongenerator";

const sourceFilePath = process.argv[2] as string;

if (!sourceFilePath.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

let sourceFilePaths = glob.sync(sourceFilePath);

const program = ts.createProgram(sourceFilePaths, {});
const actionPairs = getActionPairs(program);

generateJson(actionPairs, "graph-data.json");
generateJson(actionPairs, "viewer/src/graph-data.json");
