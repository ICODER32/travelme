import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";

const GlobeFun = ({ data }) => {
  const [data2, setData2] = useState([]);

  return (
    <div>
      <Globe
        width={1200}
        height={500}
        globeImageUrl="https://unpkg.com/three-globe@2.27.2/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={data ? data : data2}
        labelLat={(d) => d.properties.latitude}
        labelLng={(d) => d.properties.longitude}
        labelText={(d) => d.properties.name}
        labelSize={(d) => Math.sqrt(Math.random() + 4000000) * 4e-4}
        labelDotRadius={(d) => Math.sqrt(Math.random() + 40000000) * 4e-4}
        labelColor={() => "rgba(255, 216, 0, 0.75)"}
        labelResolution={2}
        enablePointerInteraction={true}
      />
    </div>
  );
};

export default GlobeFun;
