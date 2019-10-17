import * as ts from "typescript";
import * as glob from "glob";
import { types } from "util";

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

// create TS program and get the source file ASTs
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

function getListenerReturnActionTypeNames(listenerCall: ts.CallExpression) {
  const listenerBody = listenerCall.parent.getChildAt(2).getChildAt(0);

  const callSignatures = checker
    .getTypeAtLocation(listenerBody)
    .getCallSignatures();

  if (callSignatures.length <= 0) {
    return null;
  }

  const returnType = checker.getReturnTypeOfSignature(callSignatures[0]);

  // TODO: implement returnType visiting for generics instead of string magic starting here
  const returnTypeString = checker.typeToString(returnType);

  if (!returnTypeString) {
    return;
  }

  const typeNames = returnTypeString.split(" | ");
  const actionTypeNames = typeNames
    .map(type => {
      if (type === "void" || type.startsWith("Promise<void")) {
        return;
      }

      if (
        type.startsWith("AppAction") ||
        type.startsWith("Promise<AppAction")
      ) {
        const match = type.match(/<Action<([0-9a-zA-Z-_\.]+)>/);
        if (match && match.length > 1) {
          return match[1];
        }
      }

      return type;
    })
    .filter(Boolean);

  return actionTypeNames;
}

function visistListenerCall(listenerCall: ts.CallExpression) {
  listenerCount++;
  const actionTypeDisplayName = getListenerArgumentValue(
    listenerCall.arguments[0]
  );

  if (!actionTypeDisplayName) {
    return;
  }

  console.log(actionTypeDisplayName);

  const returnTypes = getListenerReturnActionTypeNames(listenerCall);

  if (!returnTypes) {
    return;
  }

  console.log(returnTypes);
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
