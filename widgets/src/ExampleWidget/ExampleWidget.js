import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/shopifyappfirefly/us-central1/app/api";

const ExampleWidget = ({ id }) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWidgetConfiguration = async (widgetId) => {
    let res = await axios.get(`${API_URL}/widgets/exampleWidget/${widgetId}`);
    console.log(res.data);
    setConfig(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getWidgetConfiguration(id);
  }, []);

  return (
    <div
      style={{
        backgroundColor: config?.bgColor ? config.bgColor : "#eee",
        padding: "10px",
      }}
    >
      <h4>ExampleWidget: {id}</h4>
      <p>Widget Data:</p>
      {isLoading && <p>Loading...</p>}
      {config && <p>{config.text}</p>}
    </div>
  );
};

export default ExampleWidget;
