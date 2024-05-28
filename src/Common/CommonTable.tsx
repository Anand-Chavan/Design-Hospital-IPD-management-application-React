import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { FaEdit, FaTrash, FaDownload, FaAd, FaPlusCircle } from 'react-icons/fa'; // Import Font Awesome icons
import '../Styles/CommonTable.css';
import DeleteConfirmation from './DeleteConfirmation';
import '../Styles/Room.css';
import { format } from 'date-fns';


interface CommonTableProps {
  columns: any[];
  data: any[];
  handleEdit?: (rowData: any) => void; // Make handleEdit optional
  handleDelete?: (rowData: any) => void; // Make handleDelete optional
  downloadInvoice?: (rowData: any) => void; // Make download optional
  showTretment?: (rowData: any) => void; 
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, handleEdit, handleDelete, downloadInvoice,showTretment }) => {
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
        <div className='text-center'>
            {showTretment &&<FaPlusCircle onClick={() => showTretment(row.original)} className='action-button cp m-1'/>}
        </div>
      ),
    };

    if(showTretment){
      return [...columns, actionsColumn,actionsColumnWithTreatment ]
    }
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
                      // <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      <td {...cell.getCellProps()}>
                      {cell.column.dataType === 'date' ? (
                        format(new Date(cell.value), 'MM/dd/yyyy') // Using date-fns format function
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
