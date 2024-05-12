// src/components/Admin/ManageRooms.js

import React from "react";
import generateDummyRooms from "../../Utils/schema";
import { useTable, useSortBy, usePagination, TableState } from 'react-table';
import '../../Styles/Room.css'


const RoomTable = ({ data }: any) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Room Type', accessor: 'room_type' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Charges', accessor: 'charges' },
      { Header: 'Capacity', accessor: 'capacity' },
      { Header: 'Created At', accessor: 'created_at' },
      { Header: 'Updated At', accessor: 'updated_at' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex }
  }: any = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0
      } as TableState<any>
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className="table-div">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-div">
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <div>
            Page{' '}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageRooms = () => {
  console.log("Manage room");
  const data = React.useMemo(() => generateDummyRooms(100), []);
  return <RoomTable data={data} />;
};

export default ManageRooms;
