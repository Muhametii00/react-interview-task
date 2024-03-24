import React, { useEffect, useState } from "react";
import icon from "../assets/icons/frame.svg";
import arrow from "../assets/icons/arrow.svg";
import Exit from "../assets/icons/exit.svg";
import Success from "../assets/icons/success.svg";
import ButtonWithIcon from "./ButtonWithIcon";
import Select from "./dropdowns/Select";
import { useApp } from "../context/AppContext";
import Category from "./dropdowns/Category";
import axios from "axios";

const CreateModal = ({ isOpen, onClose, getJobSites }) => {
  const { selectedItem, setSelectedItem, multiSelectItem, setMultiSelectItem } =
    useApp();
  const [select, setSelect] = useState(false);
  const [category, setCategory] = useState(false);
  const [jobSite, setJobSite] = useState("");

  const handleAddJob = async () => {
    try {
      const data = {
        name: jobSite,
        status: selectedItem,
        category: multiSelectItem.map((cat) => ({ name: cat })),
      };

      await axios.post(
        "https://65fd4bf59fc4425c65319886.mockapi.io/api/v1/jobsites",
        data
      );
      onClose();
      getJobSites();
    } catch (error) {
      console.error("Error adding job site:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#7AC14D";
      case "In Progress":
        return "#B3D99B";
      case "On Hold":
        return "#ECDE7C";
      default:
        return "#fff";
    }
  };

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

  useEffect(() => {
    setSelect(false);
    setSelectedItem(null);
    setCategory(false);
    setMultiSelectItem([]);
    // eslint-disable-next-line
  }, [isOpen]);

  const handleRemoveItemClick = (name) => {
    setMultiSelectItem(multiSelectItem.filter((item) => item !== name));
  };

  return (
    <div>
      <div style={styles.modalBackground} onClick={onClose}></div>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <p>Title</p>
          <span style={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div style={styles.infoTextContainer}>
          <img src={icon} alt="icon" />
          <p style={styles.infoText}>
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <p style={styles.title}>Name</p>
          <div style={styles.searchFieldStyle}>
            <input
              type="text"
              style={{ ...styles.searchInput, opacity: 0.3 }}
              placeholder="Type the jobsite’s name"
              value={jobSite}
              onChange={(e) => setJobSite(e.target.value)}
            />
          </div>
          <div style={styles.rowInputStyle}>
            <div style={{ width: "70%", position: "relative" }}>
              <p style={styles.title2}>Category Included</p>
              <div
                onClick={() => setCategory(!category)}
                style={{ ...styles.searchFieldStyle, cursor: "pointer" }}
              >
                <div
                  style={{
                    ...styles.searchInput,
                    opacity: 0.3,
                  }}
                >
                  Select
                </div>
                <img
                  src={arrow}
                  alt="Arrow"
                  style={{
                    ...styles.arrowIcon,
                    transform: category ? "rotate(180deg)" : "none",
                  }}
                />
              </div>
              {category && <Category setCategory={setCategory} />}
            </div>
            <div style={{ width: "30%", position: "relative" }}>
              <p style={styles.title2}>Status</p>
              <div
                onClick={() => setSelect(!select)}
                style={{ ...styles.searchFieldStyle, cursor: "pointer" }}
              >
                <div
                  style={{
                    ...styles.searchInput,
                    opacity: selectedItem ? 1 : 0.3,
                  }}
                >
                  <div
                    style={{
                      ...styles.status,
                      backgroundColor: getStatusColor(selectedItem),
                      marginLeft: selectedItem ? 0 : "-25px",
                    }}
                  />
                  {selectedItem ? selectedItem : "Select"}
                </div>
                <img
                  src={arrow}
                  alt="Arrow"
                  style={{
                    ...styles.arrowIcon,
                    transform: select ? "rotate(180deg)" : "none",
                  }}
                />
              </div>
              {select && <Select setSelect={setSelect} />}
            </div>
          </div>
          {multiSelectItem && (
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              {multiSelectItem.map((item) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      ...styles.status,
                      backgroundColor: getCategoryColor(item),
                    }}
                  />
                  <p>{item}</p>
                  <img
                    onClick={() => handleRemoveItemClick(item)}
                    src={Exit}
                    alt="X"
                    style={{ backgroundColor: "#FE4C4A", padding: "3px" }}
                  />
                </div>
              ))}
            </div>
          )}
          <div style={styles.buttonContainer}>
            <ButtonWithIcon
              text="Cancel Changes"
              fontSize="14px"
              width="180px"
              background="#FE4C4A"
              borderColor="#EB4345"
              icon={Exit}
              onClick={onClose}
            />
            <ButtonWithIcon
              text="Save Changes"
              fontSize="14px"
              width="165px"
              background="#71CF48"
              borderColor="#68C142"
              icon={Success}
              onClick={handleAddJob}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8FA",
    borderRadius: "10px",
    padding: "0 20px",
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    width: "45%",
    minWidth: "400px",
  },
  close: {
    cursor: "pointer",
    fontSize: "40px",
    color: "#323338",
  },
  infoTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    padding: "0 20px",
  },
  infoText: {
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "14px",
    color: "#323338",
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
  },
  searchInput: {
    display: "   flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    border: 0,
    background: "transparent",
    width: "100%",
    padding: "7px",
    outline: "none",
  },
  title: {
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    color: "#323338",
    margin: "0",
    marginBottom: "10px",
    marginTop: "5px",
  },
  title2: {
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    color: "#323338",
    margin: "0",
    marginBottom: "10px",
    marginTop: "20px",
  },
  rowInputStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  status: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  arrowIcon: {
    marginRight: "10px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    marginBottom: "15px",
    marginTop: "150px",
  },
};

export default CreateModal;
