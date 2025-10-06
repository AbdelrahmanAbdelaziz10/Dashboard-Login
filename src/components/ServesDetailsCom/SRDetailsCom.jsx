import React, { useState } from 'react'
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  useTheme,
  CardContent,
  Collapse,
} from "@mui/material";
import Card from "@mui/material/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SRUserInfo from './SRUserInfo';

const SRDetailsCom = ({RowDataSr}) => {
      const theme = useTheme();
    
      const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);

  // Toggle handlers
  const toggleUserInfo = () => setIsUserInfoOpen((prev) => !prev);
  const toggleDates = () => setIsDatesOpen((prev) => !prev);

  const UserInformation2 = [
    {
      label: "Reported By",
      Value: RowDataSr[0]?.reportedbyname || " ",
      type: "",
      Key: 1,
    },
    {
      label: "Name",
      Value: RowDataSr[0]?.reportedbyname || " ",
      type: "",
      Key: 2,
    },
    {
      label: "Phone",
      Value: RowDataSr[0]?.reportedphone || " ",
      type: "",
      Key: 3,
    },
    {
      label: "E-mail",
      Value: RowDataSr[0]?.reportedemail || " ",
      type: "",
      Key: 4,
    },
  ];

  const UserInformation = [
    {
      label: "Requested By",
      Value: RowDataSr[0]?.affectedperson || " ",
      type: "",
      Key: 1,
    },
    {
      label: "Created By",
      Value: RowDataSr[0]?.affectedperson || " ",
      type: "",
      Key: 2,
    },
    {
      label: "Name",
      Value: RowDataSr[0]?.affectedperson || " ",
      type: "",
      Key: 3,
    },
    {
      label: "Phone",
      Value: RowDataSr[0]?.affectedphone || " ",
      type: "",
      Key: 4,
    },
    {
      label: "E-mail",
      Value: RowDataSr[0]?.affectedemail || " ",
      type: "",
      Key: 5,
    },
  ];

  const dates1 = [
    {
      label: "Reported Date",
      Value: RowDataSr[0]?.reportdate || " ",
      type: "",
      Key: 1,
    },
    {
      label: "Created by",
      Value: RowDataSr[0]?.affecteddate || " ",
      type: "",
      Key: 2,
    },
  ];
  const dates2 = [
    {
      label: "Target Contact",
      Value: RowDataSr[0]?.targetcontactdate || " ",
      type: "",
      Key: 1,
    },
    {
      label: "Target Start",
      Value: RowDataSr[0]?.targetstart || " ",
      type: "",
      Key: 2,
    },
    {
      label: "Target Finish",
      Value: RowDataSr[0]?.targetfinish || " ",
      type: "",
      Key: 3,
    },
  ];
  const dates3 = [
    {
      label: "Actual Contact",
      Value: RowDataSr[0]?.actualcontactdate || " ",
      type: "",
      Key: 1,
    },
    {
      label: "Actual Start",
      Value: RowDataSr[0]?.actualstart || " ",
      type: "",
      Key: 2,
    },
    {
      label: "Target Finish",
      Value: RowDataSr[0]?.actualfinish || " ",
      type: "",
      Key: 3,
    },
  ];
  return (
    <>
       {/* ===== Section 1 - SR Details ===== */}
          <Card
            sx={{
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
                      value={RowDataSr[0]?.owner || " "}
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
                      <SRUserInfo
                        UserInformation={dates1}
                        RowDataSr={RowDataSr}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <SRUserInfo
                        UserInformation={dates2}
                        RowDataSr={RowDataSr}
                        width={"40%"}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <SRUserInfo
                        UserInformation={dates3}
                        RowDataSr={RowDataSr}
                        width={"40%"}
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Card>
            </Col>
          </Row>
    </>
  )
}

export default SRDetailsCom
