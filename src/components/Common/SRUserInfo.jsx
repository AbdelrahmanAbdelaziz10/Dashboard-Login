import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Col, Row } from "react-bootstrap";
import { Input } from "@mui/material";

const SRUserInfo = ({ UserInformation }) => {
  const theme = useTheme();

  return (
    <Row className="my-4 justify-content-between px-3">
      {UserInformation?.map((item, idx) => (
        <Col xs={12} md={12} lg={12} key={idx}>
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Label */}
            <Typography
              sx={{
                width: "120px", // ✅ all labels same width
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {item.label}:
            </Typography>

            {/* Input (takes the rest of the space) */}
            <Input
              fullWidth
              value={item.value || ""}
              readOnly
              sx={{
                flex: 1, // ✅ input stretches evenly
                borderBottom: "1px dotted #999", // mimic underline style
                "& input": { textAlign: "left" },
              }}
            />
          </Box>
        </Col>
      ))}
    </Row>
  );
};

export default SRUserInfo;
