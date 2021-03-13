"use strict";

const e = React.createElement;
const { useState, useEffect } = React;

const LikeButton = ({ id }) => {
  const [liked, setLiked] = useState(false);

  console.log({ id, liked });

  if (liked) {
    return "You liked this.";
  }
  return e("button", { onClick: () => setLiked(true) }, "Like");
};

// Actually.. I want to basically search here, find all results
// Loading this script is general, it'll identify relevant widgets on page and populate them
// So one script can be used for multiple widgets on page

let elements = document.querySelectorAll("[class*=appname");

elements.forEach((element) => {
  let references = element.className.split("_");
  // TODO: Sanitize these, make sure they're strings, etc.
  let widget = references[1]; //  test
  let id = references[2]; // 00000b

  ReactDOM.render(e(LikeButton, { id }), element);
});

// const domContainer = document.querySelector(".appname_test_000000b");
// ReactDOM.render(e(LikeButton, { id: "000000b" }), domContainer);
