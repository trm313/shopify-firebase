console.log("widgets-react.js");

// Note: when deploying, replace "development.js" with "production.min.js"
const scripts = [
  "https://unpkg.com/react@17/umd/react.development.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
];
console.log("Loading scripts: ", scripts);

// TODO: Can I compile React widgets to plain JS, and then return that to the page? Rather than loading React into the client directly

function scriptInjection(callback) {
  let loaded = [];
  const onLoad = (e) => {
    console.log("> onLoad", e);
    loaded.push(e);
    console.log(`> Scripts loaded: ${loaded.length} / ${scripts.length}`);
    if (loaded.length == scripts.length) {
      callback();
    }
  };

  scripts.map((s) => {
    console.log("> Loading script: ", s);
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = s;
    console.log("> Creating script tag: ", script);
    script.addEventListener("load", onLoad);
    document.getElementsByTagName("head")[0].appendChild(script);
  });

  // callback();
}

function loadWidgetViaScript(file, callback) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = file;
  console.log("> Creating script tag: ", script);
  script.addEventListener("load", callback);
  document.getElementsByTagName("body")[0].appendChild(script);
}

// Not a good way to do it, have to load all of the files client-side, would be bloated
// If I figure out which widget specifically to load, I can just append that script specifically to the page. Probably will be more efficient - it's an additonal script, but should be a minimal one
function loadWidget() {
  // const domContainer = document.querySelector("#like_button_container");
  // ReactDOM.render(e(LikeButton), domContainer);
}

scriptInjection(() => {
  console.log("> scriptInjection complete ");
  console.log("> starting main() ");

  console.log("> Loading widget");
  // TODO: Figure out which widget(s) to load, then append it to page:
  /*
  let elements = document.querySelectorAll("[class*=appname");
  elements.forEach((element) => {
    let references = element.className.split("_");
    let widget = references[1]; //  likeBtn
  });
  */
  loadWidgetViaScript(
    "http://localhost:5001/shopifyappfirefly/us-central1/app/scripts/widget/likeBtn.js",
    () => {
      console.log("> Widget loaded");
    }
  );
});
