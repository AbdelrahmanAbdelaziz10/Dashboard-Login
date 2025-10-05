import { useParams } from "react-router-dom";
import { useSidebar } from "../components/Context/SidebarContext";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  useTheme,
  CardContent,
  Collapse,
} from "@mui/material";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import "../Style/SRPaggesDetails.css";
import SRUserInfo from "../components/Common/SRUserInfo";
import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import { getFetch } from "../hooks/getFetch";

const ServiceRequestPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;
  const {data: SRDataRow, loading:SRLoadingRow , error: SRErrorRow }=getFetch(
    `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${id}%22&_lid=Helpdesk%201&_lpwd=Test1234`
  )
  const RowDataSr=SRDataRow?.member ?? [];
console.log(`http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${id}%22&_lid=Helpdesk%201&_lpwd=Test1234`)
  // ✅ Separate states for each section
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);

  // Toggle handlers
  const toggleUserInfo = () => setIsUserInfoOpen((prev) => !prev);
  const toggleDates = () => setIsDatesOpen((prev) => !prev);

  const UserInformation = [
    { label: "Reported By", Value: "John Doe", type: "", Key: 1 },
    { label: "Name", Value: "John Doe", type: "", Key: 2 },
    { label: "Phone", Value: "01012345678", type: "", Key: 3 },
    { label: "E-mail", Value: "john@example.com", type: "", Key: 4 },
  ];

  const UserInformation2 = [
    { label: "Requested By", Value: "06/11/2022 10:14", type: "date", Key: 1 },
    { label: "Requested Date", Value: "06/11/2022 10:14", type: "date", Key: 2 },
    { label: "Name", Value: "Jane Smith", type: "", Key: 3 },
    { label: "Phone", Value: "01234567890", type: "", Key: 4 },
    { label: "E-mail", Value: "jane@example.com", type: "", Key: 5 },
  ];

  const dates1 = [
    { label: "Reported Date", Value: "Jane Smith", type: "date", Key: 1 },
    { label: "Created by", Value: "System", type: "date", Key: 2 },
  ];
  const dates2 = [
    { label: "Target Contact", Value: "", type: "date", Key: 1 },
    { label: "Target Start", Value: "", type: "date", Key: 2 },
    { label: "Target Finish", Value: "", type: "date", Key: 3 },
  ];
  const dates3 = [
    { label: "Actual Contact", Value: "", type: "date", Key: 1 },
    { label: "Actual Start", Value: "", type: "date", Key: 2 },
    { label: "Target Finish", Value: "", type: "date", Key: 3 },
  ];

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
          style={{ marginTop: -60, marginLeft: `${sidebarWidth}px` }}
        >
          {/* ===== Section 1 - SR Details ===== */}
          <Card
            sx={{
              marginTop: 10,
              marginBottom: 5,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent>
              <Row className="g-3 justify-content-around">
                <Col xs={12} md={6} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      Service Request:
                    </Typography>
                    <Input
                      fullWidth
                      value={RowDataSr[0]?.ticketid}
                      readOnly
                      sx={{
                        flex: 1,
                        paddingLeft: 1,
                        borderBottom: "1px dotted #999",
                      }}
                    />
                  </Box>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      Owner:
                    </Typography>
                    <Input
                      fullWidth
                      value={RowDataSr[0]?.reportedbyname}
                      readOnly
                      sx={{
                        flex: 1,
                        paddingLeft: 1,
                        borderBottom: "1px dotted #999",
                      }}
                    />
                  </Box>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      Owner Group:
                    </Typography>
                    <Input
                      fullWidth
                      value={RowDataSr[0]?.OWNERGROUP || " "}
                      readOnly
                      sx={{
                        flex: 1,
                        paddingLeft: 1,
                        borderBottom: "1px dotted #999",
                      }}
                    />
                  </Box>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      Status:
                    </Typography>
                    <Input
                      fullWidth
                      value={RowDataSr[0]?.status}
                      readOnly
                      sx={{
                        flex: 1,
                        paddingLeft: 1,
                        borderBottom: "1px dotted #999",
                      }}
                    />
                  </Box>
                </Col>
              </Row>
            </CardContent>
          </Card>

  {/* ===== Section 2 - User Information ===== */}
          <Row className="stats-section justify-content-center">
            <Col xs={12} className="px-2">
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "0.75rem 1rem",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={toggleUserInfo}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    User Information
                    {isUserInfoOpen ? (
                      <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    )}
                  </Typography>
                </Box>

                <Collapse in={isUserInfoOpen} timeout="300ms">
                  <Row className="px-4 stats-section justify-content-center">
                    <Col xs={12} md={6}>
                      <SRUserInfo UserInformation={UserInformation2} />
                    </Col>
                    <Col xs={12} md={6}>
                      <SRUserInfo UserInformation={UserInformation} />
                    </Col>
                  </Row>
                </Collapse>
              </Card>
            </Col>
          </Row>

          {/* ===== Section 3 - Dates ===== */}
          <Row className="stats-section justify-content-center mt-4">
            <Col xs={12} className="px-2">
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "0.75rem 1rem",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={toggleDates}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    Dates
                    {isDatesOpen ? (
                      <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    )}
                  </Typography>
                </Box>

                <Collapse in={isDatesOpen} timeout="300ms">
                  <Row className="px-4 stats-section justify-content-center">
                    <Col xs={12} md={4}>
                      <SRUserInfo UserInformation={dates1} RowDataSr={RowDataSr}  />
                    </Col>
                    <Col xs={12} md={4}>
                      <SRUserInfo UserInformation={dates2} RowDataSr={RowDataSr} width={"40%"} />
                    </Col>
                    <Col xs={12} md={4}>
                      <SRUserInfo UserInformation={dates3} RowDataSr={RowDataSr} width={"40%"} />
                    </Col>
                  </Row>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </main>
      </Box>
    </div>
  );
};

export default ServiceRequestPage;