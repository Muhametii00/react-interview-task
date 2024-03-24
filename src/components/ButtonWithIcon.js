import React, { useState } from "react";

const ButtonWithIcon = ({
  text,
  icon,
  fontSize,
  width,
  onClick,
  margin,
  background,
  borderColor,
}) => {
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "5px",
    width: width,
    margin: margin,
    backgroundColor: hovered ? borderColor : background,
    cursor: "pointer",
  };

  const textStyle = {
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: fontSize,
    textAlign: "center",
    color: "#fff",
    margin: 0,
    padding: "0 20px",
    marginBottom: "2px",
  };

  const borderStyle = {
    width: "1px",
    height: "30px",
    backgroundColor: borderColor,
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={containerStyle}
    >
      <p style={textStyle}>{text}</p>
      <div style={borderStyle}></div>
      {icon && <img src={icon} alt="icon" style={{ padding: "0 10px" }} />}
    </div>
  );
};

export default ButtonWithIcon;
