import { useEffect, useState } from "react";
import { Col, Container, Row, Dropdown, Table } from "react-bootstrap";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { useSidebar } from "../components/Context/SidebarContext";
import ReportsModal from "../components/ReportsModal";
import "../Style/ServiceRequest.css";

const WorkOrder = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showReportsModal, setShowReportsModal] = useState(false);

  // Static data for service requests
  const [srData] = useState([
    { id: 1, number: "WO-001", status: "Open", owner: "John Doe", priority: "High", created: "2025-09-15" },
    { id: 2, number: "WO-002", status: "In Progress", owner: "Jane Smith", priority: "Medium", created: "2025-09-16" },
    { id: 3, number: "WO-003", status: "Closed", owner: "Mike Johnson", priority: "Low", created: "2025-09-10" },
    { id: 4, number: "WO-004", status: "Open", owner: "Sarah Wilson", priority: "High", created: "2025-09-17" },
    { id: 5, number: "WO-005", status: "Pending", owner: "Alex Brown", priority: "Medium", created: "2025-09-14" },
    { id: 6, number: "WO-006", status: "In Progress", owner: "Chris Green", priority: "Low", created: "2025-09-18" },
    { id: 7, number: "WO-007", status: "Closed", owner: "Emma White", priority: "High", created: "2025-09-12" },
    { id: 8, number: "WO-008", status: "Pending", owner: "Oliver Black", priority: "Medium", created: "2025-09-19" },
    { id: 9, number: "WO-009", status: "Open", owner: "Sophia Blue", priority: "Low", created: "2025-09-11" },
    { id: 10, number: "WO-010", status: "Closed", owner: "Liam Gray", priority: "High", created: "2025-09-20" },
    { id: 1, number: "WO-001", status: "Open", owner: "John Doe", priority: "High", created: "2025-09-15" },
    { id: 2, number: "WO-002", status: "In Progress", owner: "Jane Smith", priority: "Medium", created: "2025-09-16" },
    { id: 3, number: "WO-003", status: "Closed", owner: "Mike Johnson", priority: "Low", created: "2025-09-10" },
    { id: 4, number: "WO-004", status: "Open", owner: "Sarah Wilson", priority: "High", created: "2025-09-17" },
    { id: 5, number: "WO-005", status: "Pending", owner: "Alex Brown", priority: "Medium", created: "2025-09-14" },
    { id: 6, number: "WO-006", status: "In Progress", owner: "Chris Green", priority: "Low", created: "2025-09-18" },
    { id: 7, number: "WO-007", status: "Closed", owner: "Emma White", priority: "High", created: "2025-09-12" },
    { id: 8, number: "WO-008", status: "Pending", owner: "Oliver Black", priority: "Medium", created: "2025-09-19" },
    { id: 9, number: "WO-009", status: "Open", owner: "Sophia Blue", priority: "Low", created: "2025-09-11" },
    ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = srData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = srData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

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

  const handleCloseReportsModal = () => {
    setShowReportsModal(false);
  };

  // Static data for dashboard cards
  const dashboardStats = {
    serviceRequests: 550,
    allWorkOrders: 1050,
    pendingWorkOrders: 150,
    closedWorkOrders: 900,
  };

  return (
    <div className="app-container">
      <Container fluid>
        <Box
          component="main"
          sx={{
            margin: { xs: "5rem 1rem 0", md: "6rem 2rem 0" },
            minHeight: "calc(100vh - 5rem)",
          }}
        >
          <Navbar />
          <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />
          <main
            className="content-area"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <Row className="my-5 justify-content-between">
              <Col xs={8} md={4} sm={8}>
                <h4 className="service-title">Work Order 👋</h4>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex justify-content-center">
                <Dropdown className="report">
                  <Dropdown.Toggle
                    variant="primary"
                    className="create-service-dropdown "
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
                    <Dropdown.Item onClick={() => handleAction("cognosAnalytics")}>
                      Cognos Analytics
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs={3} md={4} className="d-flex justify-content-end">
                <Link className="create-service">
                  <AddIcon className="create-icon" />
                  <span>Create Work Order</span>
                </Link>
              </Col>
            </Row>

            {/* Dashboard Stats */}
            <Row className="mb-4">
              <Col md={3} className="mb-3">
                <Box className="stat-card" sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
                  <h6 className="text-primary">Service Requests</h6>
                  <h4 className="fw-bold">{dashboardStats.serviceRequests}</h4>
                </Box>
              </Col>
              <Col md={3} className="mb-3">
                <Box className="stat-card" sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 2 }}>
                  <h6 className="text-success">All Work Orders</h6>
                  <h4 className="fw-bold">{dashboardStats.allWorkOrders}</h4>
                </Box>
              </Col>
              <Col md={3} className="mb-3">
                <Box className="stat-card" sx={{ p: 2, backgroundColor: "#fff3e0", borderRadius: 2 }}>
                  <h6 className="text-warning">Pending Work Orders</h6>
                  <h4 className="fw-bold">{dashboardStats.pendingWorkOrders}</h4>
                </Box>
              </Col>
              <Col md={3} className="mb-3">
                <Box className="stat-card" sx={{ p: 2, backgroundColor: "#fbe9e7", borderRadius: 2 }}>
                  <h6 className="text-danger">Closed Work Orders</h6>
                  <h4 className="fw-bold">{dashboardStats.closedWorkOrders}</h4>
                </Box>
              </Col>
            </Row>

            {/* Service Requests Table */}
            <Box className="table-container" sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}>
              <h5 className="mb-3">Service Requests</h5>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Priority</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.number}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.owner}</td>
                      <td>
                        <span className={`priority-badge ${item.priority.toLowerCase()}`}>{item.priority}</span>
                      </td>
                      <td>{item.created}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-light"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                <span>
                  {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </Box>
          </main>
        </Box>
        {showReportsModal && (
          <ReportsModal
            show={showReportsModal}
            onHide={handleCloseReportsModal}
            reportType={"WOTRACK"}
          />
        )}
      </Container>
    </div>
  );
};

export default WorkOrder;
