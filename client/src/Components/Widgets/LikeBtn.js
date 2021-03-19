import React, { useState, useEffect } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";

// import getWidgetConfiguration from "../../Actions/Widgets/getWidgetConfiguration";

const LikeButton = ({ id }) => {
  const [liked, setLiked] = useState(false);

  console.log({ id, liked });

  useEffect(() => {
    // On load, get configuration data for widget
    // let config = getWidgetConfiguration({ id, collection: "widgetLikeBtn" });
  }, []);

  return (
    <Flex align='center' justify='center' w='100%' bg='green.100' p={8}>
      {liked ? (
        <Text p={4} bg='green.200'>
          Liked
        </Text>
      ) : (
        <Button onClick={() => setLiked(true)}>Like</Button>
      )}
    </Flex>
  );
};

export default LikeButton;
