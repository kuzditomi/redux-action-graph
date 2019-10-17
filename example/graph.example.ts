import { Type } from "typescript";

enum TYPE {
  A = "a",
  B = "b"
}

type B<C> = ()=>C;
type A<B> = () => B;

function addListener(param: TYPE) {
  return callback => {};
}

function actionBCreator(): A<B<TYPE.B>> {
  return ()=>()=>TYPE.B;
}
addListener(TYPE.A)(() => {
  return actionBCreator();
});
