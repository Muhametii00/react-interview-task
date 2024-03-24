import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Success from "../../assets/icons/success.svg";

const Category = ({ setCategory }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const { multiSelectItem, setMultiSelectItem } = useApp();

  const select = [
    {
      name: "Sidewalk Shed",
      color: "#67AA3C",
    },
    {
      name: "Scaffold",
      color: "#EFD652",
    },
    {
      name: "Shoring",
      color: "#9640BE",
    },
  ];

  const handleItemClick = (name) => {
    if (!multiSelectItem.includes(name)) {
      setMultiSelectItem([...multiSelectItem, name]);
      setCategory(false);
    } else {
      const updatedItems = multiSelectItem.filter((item) => item !== name);
      setMultiSelectItem(updatedItems);
      setCategory(false);
    }
  };

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div style={styles.container}>
      {select.map((item, index) => (
        <p
          key={index}
          style={{
            ...styles.item,
            color:
              hoveredItem === index || multiSelectItem.includes(item.name)
                ? "#fff"
                : "#323338",

            backgroundColor:
              hoveredItem === index || multiSelectItem.includes(item.name)
                ? item.color
                : "transparent",
          }}
          onMouseEnter={() => handleItemHover(index)}
          onMouseLeave={handleItemLeave}
          onClick={() => handleItemClick(item.name)}
        >
          {item.name}
          <img src={Success} alt="Success" />
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

export default Category;
