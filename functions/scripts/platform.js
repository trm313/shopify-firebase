const loadAppPlatform = () => {
  console.log("platform.js");
  let appElements = document.querySelectorAll("[class*=appname-vanilla_");
  appElements.forEach((element) => {
    let references = element.className.split("_");
    // TODO: Sanitize these, make sure they're strings, etc.
    let widget = references[1]; //  test
    let id = references[2]; // 00000b

    fetch(
      "http://localhost:5001/shopifyappfirefly/us-central1/app/scripts/boot?widgetId=" +
        id
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

loadAppPlatform();
