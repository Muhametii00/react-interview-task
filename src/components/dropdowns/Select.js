import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

const Select = ({ setSelect }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const { selectedItem, setSelectedItem } = useApp();

  const select = [
    {
      name: "Completed",
      color: "#7AC14D",
    },
    {
      name: "In Progress",
      color: "#B3D99B",
    },
    {
      name: "On Hold",
      color: "#ECDE7C",
    },
  ];

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (name) => {
    setSelectedItem(name);
    setSelect(false);
  };

  return (
    <div style={styles.container}>
      {select.map((item, index) => (
        <p
          key={index}
          style={{
            ...styles.item,
            color:
              hoveredItem === index || selectedItem === item.name
                ? "#fff"
                : "#323338",
            backgroundColor:
              hoveredItem === index || selectedItem === item.name
                ? item.color
                : "transparent",
          }}
          onMouseEnter={() => handleItemHover(index)}
          onMouseLeave={handleItemLeave}
          onClick={() => handleItemClick(item.name)}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #EFEFEF",
    borderRadius: "0px 0px 5px 5px",
    position: "absolute",
    width: "100%",
    boxShadow: "0px 1px 4px 0px #00000040",
    backgroundColor: "#FFFFFF",
    borderTop: 0,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: 0,
    borderBottom: "1px solid #EFEFEF",
    padding: "10px",
  },
};

export default Select;
