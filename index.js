document.addEventListener('DOMContentLoaded', evt => {
  const editors = document.querySelectorAll('codemirror-element');
  editors[0].source = 'function myScript() { return 100; }\n';
  editors[1].source = `print("Hello World.")


`;

  // console.log(editors[1].api)
  // console.log(editors[2].source)
  editors[2].mode = { name: 'javascript', json: true };
  editors[2].source = JSON.stringify(editors[2].mode);
  console.log(editors[2].mode);
});
