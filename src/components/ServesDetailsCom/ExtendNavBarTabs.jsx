import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ExtendNavBarTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    console.log("activeTab",activeTab)
  };

  const tabs = [
    "Service Request",
    "Related Records",
    "Log",
    "Specifications",
    "Service Address",
    "Map",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        // background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // purple → blue
        background:"#1976d2",
        color: "#fff",
        borderRadius: "0 0 12px 12px", // rounded top like your image
        px: 2,
        py: 1,
        mt: 5,
        mb: 4,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Back Button */}
      <Box
      onClick={()=>navigate("/service-request")}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mr: 3,
          "&:hover": { opacity: 0.85 },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 22, color: "#fff", mr: 0.7 }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#fff",
            fontSize: "0.95rem",
          }}
        >
          List View
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        TabIndicatorProps={{ style: { backgroundColor: "white", height: "3px" } }}
        sx={{
          minHeight: 40,
          "& .MuiTab-root": {
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            minHeight: 40,
            px: 2.5,
          },
          "& .Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.15)", // soft white overlay for selected tab
            borderRadius: "8px 8px 0 0",
            fontWeight:700,
          },
          "& .MuiTabs-flexContainer": {
            borderBottom: "none",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ExtendNavBarTabs;
