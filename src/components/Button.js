import React from "react";

const Button = ({
  text,
  fontSize,
  width,
  padding,
  margin,
  background,
  radius,
  onClick,
}) => {
  const styles = {
    fontSize: fontSize,
    textAlign: "center",
    color: "#fff",
    width: width,
    padding: padding,
    margin: margin,
    backgroundColor: background,
    borderRadius: radius,
  };

  return (
    <div onClick={onClick} style={styles}>
      {text}
    </div>
  );
};

export default Button;
