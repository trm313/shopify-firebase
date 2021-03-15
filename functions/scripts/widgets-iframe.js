console.log("widgets-iframe.js");

// TODO: Should scope everything to functions, otherwise elements becomes a global variable client-side, can interfere with other loose scripts
let elements = document.querySelectorAll("[class*=appname_");
elements.forEach((element) => {
  let references = element.className.split("_");
  // TODO: Sanitize these, make sure they're strings, etc.
  let widget = references[1]; //  test
  let id = references[2]; // 00000b

  var iFrame = document.createElement("iframe");
  iFrame.setAttribute("id", "appname-widget-" + id);
  iFrame.setAttribute("src", `http://localhost:3000/widget/${widget}/${id}`);
  iFrame.setAttribute("width", "100%");
  iFrame.setAttribute("height", "100%");
  iFrame.setAttribute("style", "border:none;");
  console.log("> Inserting iFrame: ", id);
  element.appendChild(iFrame);
});
