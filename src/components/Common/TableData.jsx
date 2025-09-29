import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import '../../Style/Tabledata.css'
// Example static data fallback


const TableData = ({ rows, loading , error}) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5; // fixed per design

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Current visible rows
  const currentRows = React.useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4, color: "error.main" }}>
        Error loading data: {error.message || error}
      </Box>
    );
  }

  // Empty state
  if (!rows.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4, color: "text.secondary" }}>
        No service requests found
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 3, borderRadius: 2 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Number</TableCell>
               <TableCell className="table-header">Status</TableCell>
               <TableCell className="table-header">Owner</TableCell>
               <TableCell className="table-header">Priority</TableCell>
               <TableCell className="table-header">Created</TableCell>
               <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.number}</TableCell>
                <TableCell>
                  <span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                  <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell>{item.created}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]} // hide rowsPerPage dropdown
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}} // no-op
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
        sx={{ borderTop: "1px solid", borderColor: "divider" }}
      />
    </Paper>
  );
};

export default TableData;
