import React, { useState } from "react";

import { Flex } from "@chakra-ui/react";

import Integration from "./Integration";

const Integrations = ({ items = [] }) => {
  return (
    <Flex direction='column'>
      {items.map((item) => (
        <Integration item={item} />
      ))}
    </Flex>
  );
};

export default Integrations;
