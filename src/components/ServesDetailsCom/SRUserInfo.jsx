import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Col, Row } from "react-bootstrap";
import { Input, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SRUserInfo = ({ UserInformation, RowDataSr, width }) => {
  const theme = useTheme();

  return (
    <Row className="my-4 justify-content-between px-3">
      <Col xs={12}>
        {UserInformation?.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Label */}
            <Typography
              sx={{
                flexBasis: width || "120px", 
                flexShrink: 0,               
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            >
              {item.label}:
            </Typography>

            {/* Input + Optional Calendar Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                gap: 0.5,
              }}
            >
              <Input
                type={item.type || "text"}
                fullWidth
                value={item.Value || ""}
                readOnly
                sx={{
                  flex: 1,
                  borderBottom: "1px dotted #999",
                  "& input": { textAlign: "left" },
                }}
              />

              {/* Show calendar icon if it's a date */}
              {item.type === "date" && (
                <IconButton
                  size="small"
                  sx={{ color: "#1565c0", marginTop: 1 }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 22 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Col>
    </Row>
  );
};

export default SRUserInfo;
