// ✅ ServiceRequest.jsx — Final Version

import { useEffect, useState } from "react";
import { Col, Row, Dropdown } from "react-bootstrap";
import { Box, Typography, Grid } from "@mui/material";
import { Assignment, BarChart, EventAvailable } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import TableData from "../components/Common/TableData";
import { useSidebar } from "../components/Context/SidebarContext";
import AddIcon from "@mui/icons-material/Add";
import "../Style/ServiceRequest.css";
import ReportsModal from "../components/ReportsModal";
import { getFetch } from "../hooks/getFetch";
import WFTableData from "../components/Common/WFTableData";

const ServiceRequest = () => {
  // === State variables ===
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [filter, setFilter] = useState("1");
  const [srDataTwo, setSrDataTwo] = useState([]);
  const [color, setColor] = useState("");
  const [showReportsModal, setShowReportsModal] = useState(false);

  // ✅ Get start & finish of current day
  const getStartDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T00:00:00"
    );
  };

  const getFinishDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T23:59:59"
    );
  };

  // ✅ Initialize start and end date only once
  useEffect(() => {
    setStartDateTime(getStartDate());
    setEndDateTime(getFinishDate());
  }, []);

  // === Fetch SR data ===
  const {
    data: sRData,
    loading: srLoading,
    error: srError,
  } = getFetch(
    "http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22HELPDESK1%22&_lid=Helpdesk%201&_lpwd=Test1234"
  );

  const {
    data: wfSRData,
    loading: wfSrLoading,
    error: wfSrError,
  } = getFetch(
    startDateTime
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3C%22${startDateTime}%22&_lid=Helpdesk%201&_lpwd=Test1234`
      : null
  );

  const {
    data: dueDay,
    loading: dDSrLoading,
    error: dDSrError,
  } = getFetch(
    startDateTime && endDateTime
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3E=%22${startDateTime}%22%20and%20sr.targetfinish%3C=%22${endDateTime}%22&_lid=Helpdesk%201&_lpwd=Test1234`
      : null
  );

  // === Prepare data ===
  const allSRData = sRData?.member ?? [];
  const allWFOverdue = wfSRData?.member ?? [];
  const allWFDueToday = dueDay?.member ?? [];

  // ✅ update data based on API
  useEffect(() => {
    setSrDataTwo(allSRData);
  }, [sRData]);

  // === Filter logic ===
  const ShowTotalSr = (value) => {
    setFilter(value);
    if (value === "1") setSrDataTwo(allSRData);
    else if (value === "2") setSrDataTwo(allWFOverdue);
    else if (value === "3") setSrDataTwo(allWFDueToday);
  };

  // === Sidebar ===
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

  // === Color change on card click ===
  const changeColor = (value) => {
    setColor(value);
  };

  // === Dropdown actions ===
  const handleAction = (action) => {
    switch (action) {
      case "changeStatus":
        console.log("Changing status...");
        break;
      case "selectOwner":
        console.log("Selecting owner...");
        break;
      case "takeOwnership":
        console.log("Taking ownership...");
        break;
      case "runReports":
        setShowReportsModal(true);
        break;
      case "cognosAnalytics":
        console.log("Opening Cognos Analytics...");
        break;
      default:
        break;
    }
  };

  // === Stats Data ===
  const stats = [
    {
      label: "Total SR",
      value: allSRData.length,
      color: "linear-gradient(135deg, #ff9a9e, #f6416c)",
      headerColor: "#f6416c",
      icon: <Assignment fontSize="large" />,
      filter: "1",
    },
    {
      label: "Overdue",
      value: allWFOverdue.length,
      color: "linear-gradient(135deg, #6a11cb, #2575fc)",
      headerColor: "#2575fc",
      icon: <BarChart fontSize="large" />,
      filter: "2",
    },
    {
      label: "Due Today",
      value: allWFDueToday.length,
      color: "linear-gradient(135deg, #f7971e, #ffd200)",
      headerColor: "#f7971e",
      icon: <EventAvailable fontSize="large" />,
      filter: "3",
    },
  ];

  // === UI ===
  return (
    <div className="app-container mb-5">
      <Navbar />
      <Box
        component="main"
        sx={{
          margin: { xs: "5rem 1rem 0", md: "6rem 2rem 0" },
          minHeight: "calc(100vh - 5rem)",
          transition: "margin 0.3s ease",
        }}
      >
        <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />

        <main
          className="content-area mb-4"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          {/* ===== Header ===== */}
          <Row className="my-5 justify-content-between">
            <Col xs={8} md={4}>
              <h4
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  color: "#1565c0",
                  fontWeight: "bold",
                }}
              >
                Service Request 👋
              </h4>
            </Col>

            {/* Dropdown Actions */}
            <Col xs={4} md={4} className="d-flex justify-content-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  style={{
                    backgroundColor: "#1565c0",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AddIcon /> <span>Select Action</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleAction("changeStatus")}>
                    Change Status
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAction("selectOwner")}>
                    Select Owner
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAction("takeOwnership")}>
                    Take Ownership
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleAction("runReports")}>
                    Run Reports
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleAction("cognosAnalytics")}
                  >
                    Cognos Analytics
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            {/* Create SR */}
            <Col xs={3} md={4} className="d-flex justify-content-end">
              <Link className="create-service">
                <AddIcon />
                <span>Create Service Request</span>
              </Link>
            </Col>
          </Row>

          {/* ===== Stats Cards ===== */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Grid container spacing={2}>
                {stats.map((item, index) => (
                  <Grid size={4} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: 3,
                        background: item.color,
                        color: "#fff",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                        },
                      }}
                      onClick={() => {
                        changeColor(item.color);
                        ShowTotalSr(item.filter);
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ opacity: 0.9, fontWeight: 600 }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                          {item.value}
                        </Typography>
                      </Box>
                      {item.icon}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Col>
          </Row>

          {/* ===== Tables ===== */}
          {filter === "1" ? (
            <TableData
              loading={srLoading}
              error={srError}
              srDataTwo={srDataTwo}
              ColorTable={color}
            />
          ) : filter === "2" ? (
            <WFTableData
              loading={wfSrLoading}
              error={wfSrError}
              srDataTwo={srDataTwo}
              ColorTable={color}
            />
          ) : filter === "3" ? (
            <WFTableData
              loading={dDSrLoading}
              error={dDSrError}
              srDataTwo={srDataTwo}
              ColorTable={color}
            />
          ) : null}

          {/* Reports Modal */}
          {showReportsModal && (
            <ReportsModal
              show={showReportsModal}
              onHide={() => setShowReportsModal(false)}
              reportType="SR"
            />
          )}
        </main>
      </Box>
    </div>
  );
};

export default ServiceRequest;