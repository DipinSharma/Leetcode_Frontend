import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { apiClient } from '../../../shared/services/api-client';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'status', label: 'status', minWidth: 30 },
  { id: 'number', label: 'number', minWidth: 30 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'difficulty', label: 'difficulty', minWidth: 100 },
];

export default function AllQuestions() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "http://localhost:1234/allProblems"
        );
        setRows(response.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='questionList'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#282828", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                      {columns.map((column) => {
                        const value = row[column.id];
                      
                        if (column.id === 'name') {
                          return (
                            <TableCell key={column.id} align={column.align} sx={{ backgroundColor: "#282828", color: "white" }}>
                              <Link to={`/problems/${value}`}style={{ textDecoration: "none", color: "inherit" }}>{value}</Link>
                              {console.log(value)}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ backgroundColor: "#282828", color: "white" }}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#282828", color: "white" }}
        />
      </Paper>
    </div>
  );
}