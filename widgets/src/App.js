import React from "react";
import logo from "./logo.svg";
import "./App.css";

const InstagramFeed = ({ id }) => {
  return (
    <div>
      <h1>InstagramFeed: {id}</h1>
    </div>
  );
};

const RedditPosts = ({ id }) => {
  return (
    <div>
      <h1>RedditPosts: {id}</h1>
    </div>
  );
};

function App({ domElement }) {
  const widget = domElement.getAttribute("data-widget");
  const id = domElement.getAttribute("data-id");
  console.log({ widget, id });

  let widgetType = widget.toUpperCase();

  if (widgetType === "INSTAGRAMFEED") {
    return <InstagramFeed id={id} />;
  }
  if (widgetType === "REDDITPOSTS") {
    return <RedditPosts id={id} />;
  }

  return;
}

export default App;
