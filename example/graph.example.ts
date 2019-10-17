import { Type } from "typescript";

enum TYPE {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e"
}
enum OTHERTYPE {
  A = "a",
  B = "b"
}

type TYPES = TYPE | OTHERTYPE;

type B<C> = () => C;
type A<B> = () => B;

function addListener(param: TYPES) {
  return callback => {};
}

function actionBCreator(): A<B<TYPE.B | void>> {
  return () => () => TYPE.B;
}

addListener(TYPE.A)(() => {
  return actionBCreator();
});

addListener(TYPE.C)(() => {
  return;
});

addListener(TYPE.D)(() => {
  if (Math.random() > 0.5) {
    return TYPE.C;
  } else if (Math.random() > 0.1) {
    return OTHERTYPE.A;
  }

  return;
});

addListener(TYPE.D)(() => {
  return null as Promise<TYPE.C>;
});


addListener(OTHERTYPE.B)(() => {
    return null as Promise<void>;
  });
  