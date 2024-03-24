import { useEffect, useState } from "react";
import Button from "../components/Button";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Plus from "../assets/icons/plus.svg";
import icon from "../assets/icons/frame.svg";
import magnifier from "../assets/icons/magnifier.svg";
import axios from "axios";
import CreateModal from "../components/CreateModal";
import { useNavigate } from "react-router-dom";

function Main() {
  const [searchInput, setSearchInput] = useState("");
  const [jobSites, setJobSites] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const getJobSites = async () => {
    try {
      await axios
        .get("https://65fd4bf59fc4425c65319886.mockapi.io/api/v1/jobsites")
        .then((response) => {
          setJobSites(response.data);
          countStatusLength(response.data);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const navigate = useNavigate();

  const handleClick = (site) => {
    navigate(`/jobsite/${site.id}`, { state: { item: site } });
  };

  useEffect(() => {
    getJobSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#7AC14D";
      case "On Hold":
        return "#FE4C4A";
      case "On Road":
        return "#ECDE7C";
      default:
        return "#7AC14D";
    }
  };

  const countStatusLength = (jobSites) => {
    const counts = {};
    jobSites.forEach((site) => {
      counts[site.status] = (counts[site.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredJobSites = jobSites.filter((site) =>
    site.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div style={styles.headContainer}>
        <Button
          text={`${statusCounts["On Road"] || 0} On Road`}
          fontSize="30px"
          width="100%"
          background="#ECDE7C"
          padding="30px 0"
          radius="10px"
        />
        <Button
          text={`${statusCounts["Completed"] || 0} Completed`}
          fontSize="30px"
          width="100%"
          background="#7AC14D"
          padding="30px 0"
          radius="10px"
        />
        <Button
          text={`${statusCounts["On Hold"] || 0} On Hold`}
          fontSize="30px"
          width="100%"
          background="#FE4C4A"
          padding="30px 0"
          radius="10px"
        />
      </div>
      <div style={styles.tableContainer}>
        <p style={styles.title}>Title</p>
        <div style={styles.headerContainer}>
          <div style={styles.infoTextContainer}>
            <img src={icon} alt="icon" />
            <p style={styles.infoText}>
              Informative piece of text that can be used regarding this modal.
            </p>
          </div>
          <div style={styles.searchContainer}>
            <div style={styles.searchFieldStyle}>
              <img src={magnifier} alt="icon" />
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search a driver"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            <span>
              <ButtonWithIcon
                text="Create"
                fontSize="14px"
                width="120px"
                background="#71CF48"
                borderColor="#68C142"
                icon={Plus}
                onClick={() => setIsOpen(true)}
              />
            </span>
          </div>
          {isOpen && (
            <CreateModal
              getJobSites={getJobSites}
              isOpen={isOpen}
              onClose={onClose}
            />
          )}
        </div>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={styles.noBorder}>Jobsite Name</th>
              <th style={styles.noBorder1}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobSites.map((site, index) => (
              <tr
                key={site.id}
                style={{
                  backgroundColor: index % 2 === 1 ? "white" : "transparent",
                }}
              >
                <td style={styles.firstChild} onClick={() => handleClick(site)}>
                  {site.name}
                </td>
                <td style={styles.lastChild}>
                  <Button
                    text={site.status}
                    background={getStatusColor(site.status)}
                    width="120px"
                    padding="8px 0"
                    radius="5px"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  headContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "5px",
    boxShadow: "0px 1px 4px 0px #00000040",
    borderRadius: "10px",
    padding: "6px",
    marginTop: "12px",
  },
  tableContainer: {
    boxShadow: "0px 1px 4px 0px #00000040",
    borderRadius: "10px",
    padding: "6px",
    marginTop: "12px",
    backgroundColor: "#F8F8FA",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: "10px",
  },
  title: {
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontWeight: 600,
    marginLeft: "10px",
  },
  infoTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    marginLeft: "10px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    width: "30%",
  },
  searchFieldStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#FCFCFC",
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    paddingLeft: "10px",
  },
  searchInput: {
    border: 0,
    background: "transparent",
    width: "100%",
    padding: "7px",
    outline: "none",
    opacity: 0.3,
  },
  noBorder: {
    padding: "8px",
    border: 0,
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    backgroundColor: "white",
    textAlign: "start",
    paddingLeft: "25%",
  },
  noBorder1: {
    padding: "8px",
    border: 0,
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "16px",
    backgroundColor: "white",
  },
  firstChild: {
    padding: "8px",
    border: 0,
    textAlign: "center",
    width: "45%",
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "14px",
    color: "#1264A3",
    cursor: "pointer",
    textAlign: "start",
    paddingLeft: "25%",
  },
  lastChild: {
    padding: "8px",
    textAlign: "center",
    border: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "14px",
    color: "#323338",
  },
};

export default Main;
