import React from "react";

// Widgets
import LikeBtn from "../Components/Widgets/LikeBtn";

const Widget = (props) => {
  const { id, type } = props.match.params;
  if (!type || !id) {
    return (
      <div>
        <h1>No widget found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* // Widgets Enumeration */}
      {
        {
          "LIKEBTN": <LikeBtn id={id} />,
        }[type.toUpperCase()]
      }
    </div>
  );
};

export default Widget;
