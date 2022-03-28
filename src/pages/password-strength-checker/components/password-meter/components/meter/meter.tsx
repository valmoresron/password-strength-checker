import React from "react";
import "./meter.scss";

function Meter(props: { color?: string }) {
  return (
    <div id="meter" style={{ backgroundColor: props.color ?? "gray" }}></div>
  );
}

export default Meter;
