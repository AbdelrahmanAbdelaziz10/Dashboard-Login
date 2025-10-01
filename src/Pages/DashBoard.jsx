import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import { useSidebar } from "../components/Context/SidebarContext";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import DashboardCard from "../components/Common/Card";
import ContactsCard from "../components/Common/ContactsCard";
import WorkOrderBarChart from "./../components/Common/Chart/WorkOrderBarChart";
import "../Style/Dashboard.css";
import { useEffect, useState } from "react";
import WorkFlowView from "../components/WorkFlowView";

export function DashBoard() {
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

  const [dataSR, setDataSR] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "/maximo/maxrest/oslc/os/MXAPIWFASSIGNMENT?lean=1&oslc.select=*&_lid=Helpdesk%201&_lpwd=Test1234";

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setDataSR(data.member || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (item) => {
    setSelectedItem(item); // Pass clicked row to modal
    setOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar />
      <Container fluid>
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
            className="content-area"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <Row className="my-4">
              <h3>Welcome back 👋</h3>
            </Row>

            {/* Stats Cards */}
            <Row className="stats-section justify-content-center">
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Service Request"
                  value="550"
                  change="20%"
                  footerText="20 Service Request Today"
                  positiveChange={true}
                />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="All Work Order"
                  value="1050"
                  change="30%"
                  footerText="600 Total Work Order Today"
                  positiveChange={false}
                />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Pending Work Order"
                  value="150"
                  change="10%"
                  footerText="20 Pending Work Order Today"
                  positiveChange={false}
                />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Close Work Order"
                  value="900"
                  change="30%"
                  footerText="300 Closed Work Order Today"
                  positiveChange={true}
                />
              </Col>
            </Row>

            {/* Workflow Table */}
            <Row className="workflow">
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
                  {dataSR.length > 0 ? (
                    dataSR.map((item) => (
                      <tr key={item.wfassignmentid}>
                        <td>
                          <strong>{item.wfassignmentid}</strong>
                        </td>

                        <td>
                          <span
                            className={`badge px-3 py-2 ${
                              item.assignstatus === "ACTIVE"
                                ? "bg-success"
                                : item.assignstatus === "INACTIVE"
                                ? "bg-secondary"
                                : "bg-dark"
                            }`}
                          >
                            {item.assignstatus || "N/A"}
                          </span>
                        </td>

                        <td>
                          <span className="text-muted">
                            {item.owner || item.assigncode || "Unassigned"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge px-3 py-2 ${
                              item.instruction?.toLowerCase().includes("urgent")
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {item.instruction || "Normal"}
                          </span>
                        </td>

                        <td>
                          {item.startdate
                            ? new Date(item.startdate).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "—"}
                        </td>

                        <td className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleView(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-3">
                        {isLoading ? "Loading..." : "No data available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Row>

            {/* Charts */}
            <Row className="dashboard-row">
              <Col xs={12} md={7} className="dashboard-column">
                <div className="chart-main-card">
                  <Typography variant="h6" className="card-title">
                    Work Order Status Overview
                  </Typography>
                  <WorkOrderBarChart />
                </div>
              </Col>
              <Col xs={12} md={5} className="dashboard-column">
                <ContactsCard />
              </Col>
            </Row>
          </main>

          {/* Keep Modal mounted always (no delay) */}
          <WorkFlowView
            open={open}
            onClose={() => setOpen(false)}
            item={selectedItem}
          />
        </Box>
      </Container>
    </div>
  );
}
