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
import SRMap from "../components/ServesDetailsCom/SRMap";
import { getFetch } from "../hooks/getFetch";
import ExtendNavBarTabs from "../components/ServesDetailsCom/ExtendNavBarTabs";
import SRDetailsCom from "../components/ServesDetailsCom/SRDetailsCom";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../components/Context/AuthContext";

const ServiceRequestPage = () => {
  const { id } = useParams();
    const {username,userId,password}=useAuth();
  const { sidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = React.useState(0);
  const sidebarWidth = sidebarOpen ? 220 : 65;
  const {
    data: SRDataRow,
    loading: SRLoadingRow,
    error: SRErrorRow,
  } = getFetch(
    `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${id}%22&_lid=${username}&_lpwd=${password}`
  );
  const RowDataSr = SRDataRow?.member ?? [];

  const tabContents = [
    <SRDetailsCom RowDataSr={RowDataSr} />,
    "No content available for Related Records tab.",
    "No content available for Log tab.",
    "No content available for Specifications tab.",
    "No content available for Service Address tab.",
    <SRMap />,
  ];
  return (
    <div className=" mb-5">
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
          {/* ===== NaBar Tab ===== */}
          <ExtendNavBarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* ===== Tab Content ===== */}
          <Box sx={{ mt: 3, position: "relative", minHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab} // important: makes animation trigger on change
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ position: "absolute", width: "100%" }}
              >
                {tabContents[activeTab] ? (
                  typeof tabContents[activeTab] === "string" ? (
                    <Box
                      sx={{
                        height: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "1rem",
                      }}
                    >
                      {tabContents[activeTab]}
                    </Box>
                  ) : (
                    tabContents[activeTab]
                  )
                ) : (
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "text.secondary",
                      fontSize: "1rem",
                    }}
                  >
                    No content available.
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
        </main>
      </Box>
    </div>
  );
};

export default ServiceRequestPage;
