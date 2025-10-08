import React, { useState } from "react";
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
import SRUserInfo from "./SRUserInfo";
// import AttachmentSection from "./AttachmentSection"; // ✅ Correct component name
import myImage from "../../assets/notfound.jpg";
import { getFetch } from "../../hooks/getFetch";
import AttachmentSection from "./AttachmentUploader";

const SRDetailsCom = ({ RowDataSr }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // preview for uploaded file
  const [base64, setBase64] = useState(null);

  const theme = useTheme();

  // Convert uploaded file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Handle new file upload
  const handleFileChange2 = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const base64String = await toBase64(selectedFile);
    setBase64(base64String);
    setPreview(base64String);
    console.log("Base64 string:",preview);
  };

  // Fetch image from API
  const { data: ApiImage } = getFetch(
    'http://192.168.0.73:9080/maxrest/oslc/os/PORTALIMAGE?lean=1&oslc.select=*&oslc.where=refobject="SR"&_lid=maxadmin&_lpwd=maxadmin'
  );

  console.log("API image:", ApiImage);
  console.log("RowDataSr:", RowDataSr);

  // Section toggles
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);

  // Handle collapses
  const toggleUserInfo = () => setIsUserInfoOpen((prev) => !prev);
  const toggleDates = () => setIsDatesOpen((prev) => !prev);
  const toggleAttachment = () => setIsAttachmentOpen((prev) => !prev);

  // Info arrays
  const UserInformation2 = [
    { label: "Reported By", Value: RowDataSr[0]?.reportedbyname || " ", Key: 1 },
    { label: "Name", Value: RowDataSr[0]?.reportedbyname || " ", Key: 2 },
    { label: "Phone", Value: RowDataSr[0]?.reportedphone || " ", Key: 3 },
    { label: "E-mail", Value: RowDataSr[0]?.reportedemail || " ", Key: 4 },
  ];

  const UserInformation = [
    { label: "Requested By", Value: RowDataSr[0]?.affectedperson || " ", Key: 1 },
    { label: "Created By", Value: RowDataSr[0]?.affectedperson || " ", Key: 2 },
    { label: "Name", Value: RowDataSr[0]?.affectedperson || " ", Key: 3 },
    { label: "Phone", Value: RowDataSr[0]?.affectedphone || " ", Key: 4 },
    { label: "E-mail", Value: RowDataSr[0]?.affectedemail || " ", Key: 5 },
  ];

  const dates1 = [
    { label: "Reported Date", Value: RowDataSr[0]?.reportdate || " ", Key: 1 },
    { label: "Created by", Value: RowDataSr[0]?.affecteddate || " ", Key: 2 },
  ];

  const dates2 = [
    { label: "Target Contact", Value: RowDataSr[0]?.targetcontactdate || " ", Key: 1 },
    { label: "Target Start", Value: RowDataSr[0]?.targetstart || " ", Key: 2 },
    { label: "Target Finish", Value: RowDataSr[0]?.targetfinish || " ", Key: 3 },
  ];

  const dates3 = [
    { label: "Actual Contact", Value: RowDataSr[0]?.actualcontactdate || " ", Key: 1 },
    { label: "Actual Start", Value: RowDataSr[0]?.actualstart || " ", Key: 2 },
    { label: "Actual Finish", Value: RowDataSr[0]?.actualfinish || " ", Key: 3 },
  ];

  // Determine image to display
  const displayImage =
    preview || // uploaded preview
    (ApiImage?.member?.[0]?.doclinks?.[0]?.content
      ? `data:image/jpeg;base64,${ApiImage.member[0].doclinks[0].content}`
      : myImage); // fallback


      {/* Upload Image*/ }
      
  const [uFile, setUFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChangeu = (e) => {
    setUFile(e.target.files[0]);
  };

  const handleUploadu = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('IMAGENAME', file.name);
    formData.append('MIMETYPE', file.type);
    formData.append('REFOBJECT', 'SR');         // Change if needed
    formData.append('REFOBJECTID', '66');       // Change if needed
    formData.append('image', file);             // File part

    try {
      const response = await fetch('http://192.168.0.73:9080/maxrest/rest/mbo/imglib?_action=addchange&_lid=maxadmin&_lpwd=maxadmin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        setUploadStatus('Upload successful!');
      } else {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        setUploadStatus('Upload failed. See console.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload error. See console.');
    }
  };




  return (
    <>
      {/* ===== Section 1 - SR Details ===== */}
      <Card
        sx={{
          marginBottom: 5,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        <CardContent>
          <Row className="g-3 justify-content-around">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Service Request:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.ticketid}
                  readOnly
                  sx={{ flex: 1, paddingLeft: 1, borderBottom: "1px dotted #999" }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Owner:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.owner || " "}
                  readOnly
                  sx={{ flex: 1, paddingLeft: 1, borderBottom: "1px dotted #999" }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Owner Group:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.OWNERGROUP || " "}
                  readOnly
                  sx={{ flex: 1, paddingLeft: 1, borderBottom: "1px dotted #999" }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Status:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.status}
                  readOnly
                  sx={{ flex: 1, paddingLeft: 1, borderBottom: "1px dotted #999" }}
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>

      {/* ===== Section 2 - User Information ===== */}
      <Row className="stats-section justify-content-center">
        <Col xs={12} className="px-2">
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
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
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
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
                  <SRUserInfo UserInformation={dates1} />
                </Col>
                <Col xs={12} md={4}>
                  <SRUserInfo UserInformation={dates2} />
                </Col>
                <Col xs={12} md={4}>
                  <SRUserInfo UserInformation={dates3} />
                </Col>
              </Row>
            </Collapse>
          </Card>
        </Col>
      </Row>

      {/* ===== Section 4 - Attachments ===== */}
      <Row className="stats-section justify-content-center mt-4">
        <Col xs={12} className="px-2">
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
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
              onClick={toggleAttachment}
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
                Attachments
                {isAttachmentOpen ? (
                  <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                ) : (
                  <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                )}
              </Typography>
            </Box>

            <Collapse in={isAttachmentOpen} timeout="300ms">
              <Row className="p-4 stats-section">
                <Col xs={12} md={9}>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <img
                      src={displayImage}
                      alt="Attachment preview"
                      style={{
                        width: "85%",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <AttachmentSection handleFileChange2={handleFileChange2} />
                </Col>
              </Row>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SRDetailsCom;





