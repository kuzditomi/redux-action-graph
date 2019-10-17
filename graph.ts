import * as ts from "typescript";
import * as glob from "glob";
import { getActionPairs } from "./src/actionVisitor";
import * as graphviz from "graphviz";

const sourceFilePath = process.argv[2] as string;

if (!sourceFilePath.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

let sourceFilePaths = glob.sync(sourceFilePath);

// create a program instance
const program = ts.createProgram(sourceFilePaths, {});
const actionPairs = getActionPairs(program);
console.log(actionPairs);

// draw graph
var g = graphviz.digraph("G");

actionPairs.forEach(pair => {
  g.addNode(pair.from, { color: "blue" });

  pair.to.forEach(to => {
    g.addNode(to, { color: "blue" });
    g.addEdge(pair.from, to).set("color", "red");
  });
});

g.setGraphVizPath("/usr/local/bin");
g.output("png", "graph.png");
