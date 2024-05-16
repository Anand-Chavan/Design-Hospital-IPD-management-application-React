import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa'; // Import Font Awesome icons
import '../Styles/CommonTable.css';
import DeleteConfirmation from './DeleteConfirmation';
import '../Styles/Room.css';


interface CommonTableProps {
  columns: any[];
  data: any[];
  handleEdit?: (rowData: any) => void; // Make handleEdit optional
  handleDelete?: (rowData: any) => void; // Make handleDelete optional
  downloadInvoice?: (rowData: any) => void; // Make download optional
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, handleEdit, handleDelete,downloadInvoice }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null); // Specify type for selectedRow

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

  const openDialogForDelete = (rowData: any) => {
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
            <FaEdit onClick={() => handleEdit(row.original)} className='action-button cp' />
          )}
          {handleDelete && (
            <FaTrash onClick={() => openDialogForDelete(row.original)} className='action-button cp' />
          )}
           {handleDelete && (
            <FaDownload onClick={() => downloadInvoiceIn(row.original)} className='action-button cp' />
          )}
        </div>
      ),
    };

    return handleEdit || handleDelete ? [...columns, actionsColumn] : columns;
  }, [columns, handleEdit, handleDelete]);

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
      data,
      initialState: { pageIndex: 0 } as any,
    },
    usePagination
  ) as any;

  return (
    <div className="common-table">
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777', marginTop: '20px' }}>No data found</p>
      ) : (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
