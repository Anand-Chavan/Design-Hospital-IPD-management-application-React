// CommonTable.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { FaEdit, FaTrash, FaDownload, FaPlusCircle, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'; // Import Font Awesome icons
import '../Styles/CommonTable.css';
import DeleteConfirmation from './DeleteConfirmation';
import '../Styles/Room.css';
import { format } from 'date-fns';
import { SelectedRow } from '../Utils/Constants';
import { Column } from '../Utils/Column';

interface CommonTableProps {
  columns: Column[];
  data: any[];
  handleEdit?: (rowData: any) => void; // Make handleEdit optional
  handleDelete?: (rowData: any) => void; // Make handleDelete optional
  downloadInvoice?: (rowData: any) => void; // Make download optional
  showTretment?: (rowData: any) => void; // For Treatment Section
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, handleEdit, handleDelete, downloadInvoice, showTretment }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');


  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach((ele, index) => {
        ele['index'] = index;
      })
    }
  }, [])

  const downloadInvoiceIn = (rowData: any) => {
    setSelectedRow(rowData);
    if (downloadInvoice) {
      downloadInvoice(rowData);
    }
  };

  const handleDeleteIn = () => {
    setShowModal(false);
    if (handleDelete) {
      handleDelete(selectedRow);
    }
  };

  const openDialogForDelete = (rowData: SelectedRow) => {
    setShowModal(true);
    setSelectedRow(rowData);
  };

  const columnsWithActions = useMemo(() => {
    const actionsColumn = {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: any) => (
        <div className='text-center'>
          {handleEdit && (
            <FaEdit onClick={() => handleEdit(row.original)} className='action-button cp m-1' />
          )}
          {handleDelete && (
            <FaTrash onClick={() => openDialogForDelete(row.original)} className='action-button cp m-1' />
          )}
          {downloadInvoice && (
            <FaDownload onClick={() => downloadInvoiceIn(row.original)} className='action-button cp m-1' />
          )}
        </div>
      ),
    };
    const actionsColumnWithTreatment = {
      Header: 'Treatment',
      accessor: 'treatment',
      Cell: ({ row }: any) => (
        <div>
          {showTretment && <FaPlusCircle onClick={() => showTretment(row.original)} className='action-button cp m-1' />}
        </div>
      ),
    };

    if (showTretment) {
      return [...columns, actionsColumn, actionsColumnWithTreatment];
    }
    return handleEdit || handleDelete ? [...columns, actionsColumn] : columns;
  }, [columns, handleEdit, handleDelete, showTretment]);


  const filteredData = useMemo(() => {
    if (searchTerm) {
      return data.filter(row =>
        columns.some(column =>
          String(row[column.accessor]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return data;
  }, [data, searchTerm, columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns: columnsWithActions,
      data: filteredData,
      initialState: { pageIndex: 0 } as any,
    },
    useSortBy,
    usePagination
  ) as any;

  return (
    <div className="common-table">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input mb-2"
      />
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777', marginTop: '20px' }}>No data found</p>
      ) : (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any, indexThead: number) => (
                <tr key={indexThead} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any, indexTh: number) => (
                    <>
                      <th key={indexTh} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {(column.render('Header')!="Actions" && column.render('Header')!="Treatment") ? (column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          )
                        ) : (
                          <FaSort />
                        )):(<></>)}
                      </th>
                    </>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell: any, indexTd: number) => (
                      <td key={indexTd} {...cell.getCellProps()}>
                        {cell.column.dataType === 'date' ? (
                          format(new Date(cell.value), 'dd/MM/yyyy hh:mm:ss')
                        ) : cell.column.Header === 'ID' ? (
                          Number(row.id) + 1
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    ))}

                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </div>

          {showModal && (
            <DeleteConfirmation
              show={showModal}
              onHide={() => setShowModal(false)}
              onDeleteConfirm={handleDeleteIn}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CommonTable;
