import { useParams } from "react-router-dom";
import { useSidebar } from "../components/Context/SidebarContext";
import { Col, Row, Dropdown } from "react-bootstrap";
import {
  Box,
  Typography,
  Grid,
  Input,
  useTheme,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import "../Style/SRPaggesDetails.css";
import { Label } from "recharts";
import SRUserInfo from "../components/Common/SRUserInfo";
import Card from "@mui/material/Card";

const ServiceRequestPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  // ✅ Fetch SR data
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;
  
  
  const UserInformation = [
    { label: "Reported By", Value: "John Doe", type: "", Key: 1 },
    { label: "Name", Value: "John Doe", type: "", Key: 2 },
    { label: "Phone", Value: "John Doe", type: "", Key: 3 },
    { label: "E-mail", Value: "John Doe", type: "", Key: 4 },
  ];
  const UserInformation2 = [
    { label: "Requested By", Value: "John Doe", type: "", Key: 1 },
    { label: "Created by", Value: "John Doe", type: "", Key: 2 },
    { label: "Name", Value: "John Doe", type: "", Key: 3 },
    { label: "Phone", Value: "John Doe", type: "", Key: 4 },
    { label: "E-mail", Value: "John Doe", type: "", Key: 5 },
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
          {/* Section 1 For the SR Main Details */}

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
                  <Col xs={12} md={6} lg={3} >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Label */}
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        Service Request:
                      </Typography>

                      {/* Input */}
                      <Input
                        fullWidth
                        value={id}
                        readOnly
                        sx={{
                          flex: 1,
                          paddingLeft: 1,
                          borderBottom: "1px dotted #999",
                          "& input": { textAlign: "left" },
                        }}
                      />
                    </Box>
                  </Col>
                  <Col xs={12} md={6} lg={2} >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Label */}
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        Owner:
                      </Typography>

                      {/* Input */}
                      <Input
                        fullWidth
                        value="John Doe"
                        readOnly
                        sx={{
                          flex: 1,
                          paddingLeft: 1,
                          borderBottom: "1px dotted #999",
                          "& input": { textAlign: "left" },
                        }}
                      />
                    </Box>
                  </Col>
                  <Col xs={12} md={6} lg={3} >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Label */}
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        Owner Group:
                      </Typography>

                      {/* Input */}
                      <Input
                        fullWidth
                        value="Support Team"
                        readOnly
                        sx={{
                          flex: 1,
                          paddingLeft: 1,
                          borderBottom: "1px dotted #999",
                          "& input": { textAlign: "left" },
                        }}
                      />
                    </Box>
                  </Col>
                  <Col xs={12} md={6} lg={2} >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Label */}
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        Status:
                      </Typography>

                      {/* Input */}
                      <Input
                        fullWidth
                        value="Open"
                        readOnly
                        sx={{
                          flex: 1,
                          paddingLeft: 1,
                          borderBottom: "1px dotted #999",
                          "& input": { textAlign: "left" },
                        }}
                      />
                    </Box>
                  </Col>
              </Row>
            </CardContent>
          </Card>
          {/* Section 2 For the SR Main Details */}

          {/* Stats Cards */}
          <Row className="stats-section justify-content-center">
            <Col xs={12} md={12} className="px-2">
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* The Header Of Card*/}
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "0.75rem 1rem",
                    borderTOPLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    "& p": {
                      m: 0,
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textAlign: "center",
                    },
                  }}
                >
                  <Typography component="p" className="UserInfo-title">
                    User Information
                  </Typography>
                </Box>

                <Row className="px-4 stats-section justify-content-center">
                  <Col xs={12} md={6} className="px-2">
                    <SRUserInfo
                      UserInformation={UserInformation2}
                      positiveChange={false}
                    />
                  </Col>
                  <Col xs={12} md={6} className="px-2">
                    <SRUserInfo
                      UserInformation={UserInformation}
                      positiveChange={true}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </main>
      </Box>
    </div>
  );
};

export default ServiceRequestPage;
