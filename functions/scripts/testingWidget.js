console.log("testingWidget.js");

function scriptInjection(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  script.src = src;
  if (typeof callback == "function") {
    script.addEventListener("load", callback);
  }

  document.getElementsByTagName("head")[0].appendChild(script);
}

scriptInjection("https://code.jquery.com/jquery-3.2.1.min.js", function () {
  window.$jq321 = jQuery.noConflict(true);
  let root = $jq321("#firebase-boilerplate-123");
  if (!root) return;

  root.css("position", "relative");
  root.html(
    `
    <div style="display: flex; flex-wrap: wrap; position: absolute; left: 0; width: 100vw; background-color: #000;">
      <div style="background-color: #eee; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-right: 10px;">
        <h6>Block 1</h6>
        <p>Block 1 subtext</p>
      </div>
      <div style="background-color: #eee; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-right: 10px;">
        <h6>Block 2</h6>
        <p>Block 2 subtext</p>
      </div>
      <div style="background-color: #eee; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-right: 10px;">
        <h6>Block 3</h6>
        <p>Block 3 subtext</p>
      </div>
    </div>
    `
  );
  console.log("root", root);
});
