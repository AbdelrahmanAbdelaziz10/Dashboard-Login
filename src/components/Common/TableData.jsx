import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import "../../Style/Tabledata.css";
import { useNavigate } from "react-router-dom";

const TableData = ({ srDataTwo, ColorTable, loading, error }) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10; // fixed to 10 rows per page
  // console.log("new Api:", srDataTwo);
  const navigate = useNavigate(); // ✅ hook for navigation

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // ✅ Always slice from tableData
  const currentRows = React.useMemo(() => {
    return srDataTwo.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [srDataTwo, page]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 4,
          color: "error.main",
        }}
      >
        Error loading data: {error.message || error}
      </Box>
    );
  }

  if (!srDataTwo.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 4,
          color: "text.secondary",
        }}
      >
        No service requests found
      </Box>
    );
  }

  // console.log(currentRows);

  return (
    <Box
      sx={{
        background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        marginBottom: "2rem",
        borderRadius: 3,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Paper sx={{ boxShadow: "none", borderRadius: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                background:
                  ColorTable ||
                  "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)", // fallback if no color
              }}
            >
              <TableCell
                colSpan={10}
                sx={{
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  background: ColorTable || "#1565c0", // ✅ مربوط بالـ state
                }}
              >
                Service Requests
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">Service Request</TableCell>
              <TableCell className="table-header">Summary</TableCell>
              <TableCell className="table-header">Department</TableCell>
              <TableCell className="table-header">Work Type</TableCell>
              <TableCell className="table-header">Priority</TableCell>
              <TableCell className="table-header">Requested by</TableCell>
              <TableCell className="table-header">Reported Date</TableCell>
              <TableCell className="table-header">Status</TableCell>
              <TableCell className="table-header">Status Date</TableCell>
              <TableCell className="table-header">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((item) => (
              <TableRow
                key={item.ticketid}
                hover
                sx={{
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "#f5faff",
                    transform: "scale(1.01)",
                  },
                }}
              >
                <TableCell>{item.ticketid || "NULL"}</TableCell> 
                <TableCell>{item.description || "NULL"}</TableCell> 
                <TableCell>{item.exedept || "NULL"}</TableCell> 
                <TableCell>{item.worktype || "NULL"}</TableCell> 
                <TableCell>{item.reportedpriority || "NULL"}</TableCell> 
                <TableCell>{item.reportedby || "NULL"}</TableCell> 
                <TableCell>{item.reportdate || "NULL"}</TableCell> 
                <TableCell>
                  <span
                    className={`status-badge ${item.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status} 
                  </span>
                </TableCell>
                <TableCell>{item.statusdate}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",
                      px: 2,
                      "&:hover": {
                        backgroundColor: "#1565c0",
                        color: "white",
                      },
                    }}
                    onClick={() =>
                      navigate(`/service-request/${item.ticketid}`)
                    } // ✅ navigate to details page
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={srDataTwo.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]} // fixed, no dropdown
          onPageChange={handleChangePage}
          onRowsPerPageChange={() => {}} // no-op
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} of ${count}`
          }
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fafafa",
          }}
        />
      </Paper>
    </Box>
  );
};

export default TableData;
