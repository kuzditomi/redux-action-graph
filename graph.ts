import * as ts from "typescript";
import * as fs from "fs";

import { Tabulator } from "./src/tab";

const sourceFilePaths = process.argv.slice(2);

if (!sourceFilePaths.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

// create a program instance
const program = ts.createProgram(sourceFilePaths, {});

// pull off the typechecker instance from our program
const checker = program.getTypeChecker();

// get the source file AST
const asts = program.getSourceFiles();

function getListenerArgumentValue(argument: ts.Expression): string {
  if (argument.kind === ts.SyntaxKind.StringLiteral) {
    return argument.getText();
  }

  const symbol = checker.getSymbolAtLocation(argument);
  if (symbol) {
    if (symbol.valueDeclaration.kind === ts.SyntaxKind.VariableDeclaration) {
      return (symbol.valueDeclaration as ts.VariableDeclaration).initializer.getText();
    }
  }

  const name = argument.getText();
  if (name === 'type'){
      return name + ' --- ' + argument.getSourceFile().moduleName
  }

  return name;
}

let listenerCount = 0;
function checkNode(nodeToVisit: ts.Node) {
  if (nodeToVisit.kind === ts.SyntaxKind.CallExpression) {
    const callExpression = nodeToVisit as ts.CallExpression;
    const functionName = callExpression.expression.getText();

    if (functionName === "addListener") {
      listenerCount++;
      const paremeter = getListenerArgumentValue(callExpression.arguments[0]);
      console.log(paremeter);
    }
  }
}

function visit(nodeToVisit: ts.Node) {
  checkNode(nodeToVisit);

  tabulator.increaseTab();
  ts.forEachChild(nodeToVisit, node => {
    visit(node);
  });
  tabulator.descreaseTab();
}

let tabulator = new Tabulator();
asts.forEach(ast => {
    // console.log(ast.moduleName)
  visit(ast);
});

console.log(listenerCount);
