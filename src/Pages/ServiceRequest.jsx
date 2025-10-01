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
import { Outlet } from "react-router-dom";
import WFTableData from "../components/Common/WFTableData";

const ServiceRequest = () => {
  const [filter, setFilter] = useState("1");
  // ✅ Fetch SR data
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
    "http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=app=%22SR%22&_lid=Helpdesk%201&_lpwd=Test1234"
  );
  // ✅ All SR data
  const allSRData = sRData?.member ?? [];
  const allSRData2 = wfSRData?.member ?? [];

  // ✅ State for filtered data
  const [srDataTwo, setSrDataTwo] = useState(allSRData);
  const [dataLength, setDataLength] = useState(srDataTwo.length);

  // update whenever API data changes
  useEffect(() => {
    setSrDataTwo(allSRData);
  }, [sRData]);

  // ✅ Filter logic
  const ShowTotalSr = (value) => {
    setFilter(value);
    if (value === "1") {
      setSrDataTwo(allSRData); // ✅ Show all
      setDataLength(srDataTwo.length);
    } else if (value === "2") {
      setSrDataTwo(allSRData2); // ✅ Empty
      setDataLength(srDataTwo.length);
    } else if (value === "3") {
      setSrDataTwo([]);
      setDataLength(0);
    }
  };
  const stats = [
    {
      label: "Total SR",
      value: allSRData.length,
      color: "linear-gradient(135deg, #ff9a9e, #f6416c)", // box color
      headerColor: "#f6416c", // ✅ solid color for header
      icon: <Assignment fontSize="large" />,
      filter: "1",
    },
    {
      label: "Overview",
      value: allSRData2.length,
      color: "linear-gradient(135deg, #6a11cb, #2575fc)",
      headerColor: "#2575fc",
      icon: <BarChart fontSize="large" />,
      filter: "2",
    },
    {
      label: "Due Today",
      value: 0,
      color: "linear-gradient(135deg, #f7971e, #ffd200)",
      headerColor: "#f7971e",
      icon: <EventAvailable fontSize="large" />,
      filter: "3",
    },
  ];

  {
    /* Filter To Total SR*/
  }

  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;
  const [color, setColor] = useState();
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const changeColor = (value) => {
    setColor(value);
    console.log("the color in of fun:", color);
  };
  console.log("the color out of fun:", color);

  // ✅ Handle actions
  const handleAction = (action) => {
    setSelectedAction(action);

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
        console.log("Running reports...");
        setShowReportsModal(true);
        break;
      case "cognosAnalytics":
        console.log("Opening Cognos Analytics...");
        break;
      default:
        break;
    }
  };

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
          {/* Header */}
          <Row className="my-5 justify-content-between">
            <Col xs={8} md={4} sm={8}>
              <h4
                className="service-title"
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
            <Col xs={4} md={4} sm={4} className="d-flex justify-content-center">
              <Dropdown className="report">
                <Dropdown.Toggle
                  variant="primary"
                  className="create-service-dropdown"
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
                  <AddIcon className="create-icon" />
                  <span>Select Action</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="report_menu">
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

            {/* Create Service Request */}
            <Col xs={3} md={4} className="d-flex justify-content-end">
              <Link className="create-service">
                <AddIcon className="create-icon" />
                <span>Create Service Request</span>
              </Link>
            </Col>
          </Row>

          {/* Dashboard Stats */}
          <Row className="mb-4">
            {/*The Filtration Card*/}
            <Col md={6} className="mb-3">
              <Grid container spacing={2}>
                {stats.map((item, index) => (
                  <Grid item xs={12} key={index}>
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
                    >
                      <Box
                        onClick={() => {
                          changeColor(item.color);
                          ShowTotalSr(item.filter);
                        }}
                      >
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

          {/* Service Requests Table */}
          {filter === "1" ? (
            <TableData
              loading={srLoading}
              error={srError}
              srDataTwo={srDataTwo} // ✅ filtered state
              ColorTable={color}
            />
          ) : (
            <WFTableData
              loading={wfSrLoading}
              error={wfSrError}
              srDataTwo={srDataTwo} // ✅ filtered state
              ColorTable={color}
            />
          )}

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
