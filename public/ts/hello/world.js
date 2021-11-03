(() => {
  // ns-hugo:/home/jurjen/www/jurjen.dev/assets/ts/hello/MyClass.ts
  var MyClass = class {
    sayHello(s) {
      return `Hello ${s}`;
    }
  };

  // <stdin>
  var test = new MyClass();
  console.log(test.sayHello("World"));
})();
