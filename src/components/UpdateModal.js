import React, { useState } from "react";
import icon from "../assets/icons/frame.svg";
import arrow from "../assets/icons/arrow.svg";
import Success from "../assets/icons/success.svg";
import ButtonWithIcon from "./ButtonWithIcon";
import ItemSelect from "./dropdowns/ItemSelect";
import axios from "axios";
// import Select from "./dropdowns/Select";

const UpdateModal = ({ getTable, onClose, itemId }) => {
  const [select, setSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const initialValues = {
    item: "",
    quantity: "",
    description: "",
    notes: "",
  };

  const [contact, setContact] = useState(initialValues);

  const handleChange = (key, value) => {
    setContact({ ...contact, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://65fd4bf59fc4425c65319886.mockapi.io/api/v1/sidewalk/${itemId}`,
        contact
      );
      onClose();
      getTable();
    } catch (error) {
      console.error("Error adding job site:", error);
    }
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
          <div style={styles.firstRow}>
            <div style={{ width: "49%", position: "relative" }}>
              <p style={styles.title2}>Item</p>
              <div
                onClick={() => setSelect(!select)}
                style={{ ...styles.searchFieldStyle, cursor: "pointer" }}
              >
                <div
                  style={{
                    ...styles.searchInput1,
                    opacity: selectedItem ? 1 : 0.3,
                  }}
                >
                  {selectedItem ? selectedItem : "Search & Select item"}
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
              {select && (
                <ItemSelect
                  selectedItem={selectedItem}
                  handleChange={handleChange}
                  setSelectedItem={setSelectedItem}
                  setSelect={setSelect}
                />
              )}
            </div>

            <div style={{ width: "49%" }}>
              <p style={styles.title2}>Quantity</p>
              <div style={styles.searchFieldStyle}>
                <input
                  type="text"
                  style={{ ...styles.searchInput, opacity: 0.3 }}
                  placeholder="Set Quantity"
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div style={styles.rowInputStyle}>
            <p style={styles.title2}>Description</p>
            <div style={styles.description}>
              <input
                type="text"
                style={{ ...styles.searchInput, opacity: 0.3 }}
                placeholder="Type the description..."
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <p style={styles.title2}>Notes</p>
            <div style={styles.description}>
              <input
                type="text"
                style={{ ...styles.searchInput, opacity: 0.3 }}
                placeholder="Type a note..."
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <ButtonWithIcon
              text="Save Changes"
              fontSize="14px"
              width="165px"
              background="#71CF48"
              borderColor="#68C142"
              icon={Success}
              onClick={handleUpdate}
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
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    width: "50%",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    border: 0,
    background: "transparent",
    width: "100%",
    padding: "9px",
    outline: "none",
  },
  searchInput1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    border: 0,
    background: "transparent",
    width: "100%",
    padding: "7px",
    outline: "none",
    fontFamily: "Open Sans",
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
    marginTop: "10px",
    marginLeft: "8px",
  },
  rowInputStyle: {
    display: "flex",
    flexDirection: "column",
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
    margin: "15px 0",
  },
  description: {
    backgroundColor: "#FCFCFC",
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    padding: "5px 0 100px 5px",
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
  },
};

export default UpdateModal;
