console.log("widgets.js");

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
  // let root = $jq321(".app-trm_123-123-123-123");
  // window.$ = jQuery.noConflict(true);

  // Find all elements that start with "app-trm_" so that I can then parse them to extract ID
  let root = $jq321("div[class*=app-trm_]");
  console.log(root);

  if (!root) return;

  root.map((r) => {
    let $r = $jq321(r);
    console.log("$r", $r, $r.className, $r.classList);
    let id = r.className.split("app-trm_");
    console.log("id:", id);
  });

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
});
