import * as ts from "typescript";
import * as glob from "glob";

const sourceFilePath = process.argv[2] as string;

if (!sourceFilePath.length) {
  console.log("PLEASE PROVIDE SOURCE FILE");
  process.exit(-1);
}

let sourceFilePaths = glob.sync(sourceFilePath);

// create a program instance
const program = ts.createProgram(sourceFilePaths, {});

// pull off the typechecker instance from our program
const checker = program.getTypeChecker();

// get the source file AST
const asts = program.getSourceFiles();
let listenerCount = 0;
asts.forEach(ast => {
  visit(ast);
});

console.log(listenerCount);

// ---------------------

function getListenerArgumentValue(argument: ts.Expression): string | null {
  if (argument.kind === ts.SyntaxKind.PropertyAccessExpression) {
    return argument.getText();
  }

  return null;
}

function visistListenerCall(listenerCall: ts.CallExpression) {
  listenerCount++;
  const actionTypeDisplayName = getListenerArgumentValue(
    listenerCall.arguments[0]
  );

  if (!actionTypeDisplayName) {
    return;
  }

  const listenerBody = listenerCall.parent.getChildAt(2).getChildAt(0);

  // console.log(checker.typeToString(checker.getTypeAtLocation(listenerBody)));

  const callSignatures = checker
    .getTypeAtLocation(listenerBody)
    .getCallSignatures();

  const returnTypes = callSignatures.map(s =>
    checker.getReturnTypeOfSignature(s)
  );

  console.log(actionTypeDisplayName);
  console.log(returnTypes.map(rt => checker.typeToString(rt)));
  console.log("------");
}

function isListenerCall(nodeToVisit: ts.Node) {
  if (nodeToVisit.kind !== ts.SyntaxKind.CallExpression) {
    return false;
  }

  const callExpression = nodeToVisit as ts.CallExpression;
  const functionName = callExpression.expression.getText();

  return functionName === "addListener";
}

function visit(nodeToVisit: ts.Node) {
  if (isListenerCall(nodeToVisit)) {
    console.log("------");
    visistListenerCall(nodeToVisit as ts.CallExpression);
    return;
  }

  ts.forEachChild(nodeToVisit, node => {
    visit(node);
  });
}
