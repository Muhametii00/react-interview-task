import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "../assets/images/box.svg";
import magnifier from "../assets/icons/magnifier.svg";
import Success from "../assets/icons/success.svg";
import Back from "../assets/icons/back-icon.svg";
import axios from "axios";
import UpdateModal from "../components/UpdateModal";
import ButtonWithIcon from "../components/ButtonWithIcon";

const Jobsite = () => {
  const location = useLocation();

  const { item } = location.state;
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const [table, setTable] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleNavigation = (site) => {
    navigate("/");
  };

  const getTable = async () => {
    try {
      await axios
        .get("https://65fd4bf59fc4425c65319886.mockapi.io/api/v1/sidewalk")
        .then((response) => {
          setTable(response.data);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTable();
    // eslint-disable-next-line
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredTable = table.filter((item) =>
    item.item.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sidewalk Shed":
        return "#67AA3C";
      case "Scaffold":
        return "#EFD652";
      case "Shoring":
        return "#9640BE";
      default:
        return "#fff";
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOpenModal = (id) => {
    setIsOpen(true);
    setItemId(id);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.box, width: "25%" }}>
        <p style={styles.boxTitle}>{item.name}</p>
        <div style={styles.category}>
          {item.category.map((cate) => (
            <div
              key={cate.name}
              onClick={() => setCategory(cate.name)}
              onMouseEnter={() => setHoveredCategory(cate.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                ...styles.categoryContainer,
                backgroundColor:
                  hoveredCategory === cate.name || category === cate.name
                    ? getCategoryColor(cate.name)
                    : "#F8F8FA",

                color:
                  hoveredCategory === cate.name || category === cate.name
                    ? "#fff"
                    : "#000000",
                position: "relative",
              }}
            >
              <p key={cate.name} style={styles.categoryName}>
                {cate.name}
              </p>
              {(hoveredCategory === cate.name || category === cate.name) && (
                <img
                  src={Success}
                  alt="Success"
                  style={styles.successImgStyle}
                />
              )}
            </div>
          ))}
        </div>
        <div style={styles.button}>
          <ButtonWithIcon
            text="Go Back"
            fontSize="14px"
            width="140px"
            background="#1264A3"
            borderColor="#0F5C97"
            icon={Back}
            onClick={handleNavigation}
          />
        </div>
      </div>
      <div style={{ ...styles.box, width: "73%" }}>
        <div style={styles.boxWithSearch}>
          <p style={styles.boxTitle1}>{category ? category : "Data Grid"}</p>
          <div style={styles.searchClose}>
            <div
              style={{
                ...styles.searchFieldStyle,
                marginRight: category ? "0" : "10px",
              }}
            >
              <img src={magnifier} alt="icon" />
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search a driver"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            {category && (
              <span style={styles.close} onClick={() => setCategory(null)}>
                &times;
              </span>
            )}
          </div>
        </div>
        {isOpen && (
          <UpdateModal
            itemId={itemId}
            getTable={getTable}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
        {category === "Sidewalk Shed" ? (
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr
                style={{
                  textAlign: "justify",
                }}
              >
                <th style={{ ...styles.firstChild1, width: "5%" }}>Nr.</th>
                <th style={{ ...styles.firstChild1, width: "10%" }}>Item</th>
                <th style={{ ...styles.firstChild1, width: "10%" }}>
                  Quantity
                </th>
                <th style={{ ...styles.firstChild1, width: "40%" }}>
                  Description
                </th>
                <th style={styles.firstChild1}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 1 ? "white" : "#F8F8FA",
                  }}
                  onDoubleClick={() => handleOpenModal(item.id)}
                >
                  <td style={styles.firstChild}>{item.id}</td>
                  <td style={styles.firstChild}>{item.item}</td>
                  <td style={styles.firstChild}>{item.quantity}</td>
                  <td style={styles.firstChild}>{item.description} </td>
                  <td style={styles.firstChild}>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : category === "Scaffold" || category === "Shoring" ? (
          <div style={styles.emptyContainer}>
            <img src={Box} alt="Box" />
            <p style={styles.noService}>No Data for this Service</p>
            <p style={styles.pleaseSelect}>
              Please select another service on your left.
            </p>
          </div>
        ) : (
          <div style={styles.emptyContainer}>
            <img src={Box} alt="Box" />
            <p style={styles.noService}>No Service Selected</p>
            <p style={styles.pleaseSelect}>
              Please select a service on your left to proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    overflow: "hidden",
    padding: "10px",
  },
  box: {
    boxShadow: "0px 1px 4px 0px #00000029",
    height: "65vh",
    borderRadius: "10px",
    overflow: "auto",
    position: "relative",
  },
  boxTitle: {
    backgroundColor: "#F8F8FA",
    borderRadius: "10px",
    margin: 0,
    padding: "20px 0 20px 20px",
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: 600,
    color: "#323338",
  },
  boxTitle1: {
    margin: 0,
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: 600,
    color: "#323338",
  },
  boxWithSearch: {
    backgroundColor: "#F8F8FA",
    borderRadius: "10px",
    padding: "10px 0 10px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    textAlign: "center",
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    margin: "0 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  categoryName: {
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: 0,
  },
  searchFieldStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#FCFCFC",
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    paddingLeft: "10px",
    width: "100%",
  },
  searchInput: {
    border: 0,
    background: "transparent",
    width: "100%",
    padding: "13px",
    outline: "none",
    opacity: 0.3,
  },
  successImgStyle: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  searchClose: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  close: {
    fontSize: "30px",
    color: "#000000",
    marginRight: "10px",
    cursor: "pointer",
  },
  noService: {
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: 600,
    margin: 0,
    color: "#000000",
  },
  pleaseSelect: {
    fontSize: "16px",
    fontFamily: "Open Sans",
    fontWeight: 400,
    margin: 0,
    color: "#000000",
  },
  firstChild: {
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "16px",
    color: "#000000",
    cursor: "pointer",
    marginRight: "30px",
    padding: "10px",
  },
  firstChild1: {
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    color: "#000000",
    cursor: "pointer",
    marginRight: "30px",
    padding: "10px",
  },
  button: {
    position: "absolute",
    bottom: "5px",
    right: "50%",
    transform: "translate(50%, -50%)",
  },
};

export default Jobsite;
