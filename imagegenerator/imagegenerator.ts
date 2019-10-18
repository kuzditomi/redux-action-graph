import * as graphviz from "graphviz";
import { ActionPair } from "../src/actionVisitor";
import * as actionPairs from "../graph-data.json";

const imagePath = process.argv[2];

if (!imagePath.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

generatePng(actionPairs, imagePath);

function generatePng(actionPairs: ActionPair[], imagePath: string) {
  const g = graphviz.digraph("G");

  actionPairs.forEach(pair => {
    g.addNode(pair.from, { color: "blue" });

    pair.to.forEach(to => {
      g.addNode(to, { color: "blue" });
      g.addEdge(pair.from, to).set("color", "red");
    });
  });

  g.setGraphVizPath("/usr/local/bin");
  g.output("png", imagePath);
}
