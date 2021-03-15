console.log("widgets-vanilla.js");

let appElements = document.querySelectorAll("[class*=appname-vanilla_");
appElements.forEach((element) => {
  let references = element.className.split("_");
  // TODO: Sanitize these, make sure they're strings, etc.
  let widget = references[1]; //  test
  let id = references[2]; // 00000b

  let liked = false;
  let likeBtn = document.createElement("button");
  likeBtn.innerText = "Like";
  likeBtn.addEventListener("click", () => {
    if (!liked) {
      liked = true;
      likeBtn.innerText = "Liked";
    } else {
      liked = false;
      likeBtn.innerText = "Like";
    }
  });

  element.appendChild(likeBtn);
});
