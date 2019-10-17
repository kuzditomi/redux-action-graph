const TYPE_A = 'a';
const TYPE_B = 'b';

function addListener(type: string) {
  console.log(type);
}

function a() {
    addListener(TYPE_A);
}

function b() {
    addListener(TYPE_B);
}

function c() {
    addListener('c');
}