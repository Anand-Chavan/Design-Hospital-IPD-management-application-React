import { FC } from 'react';
import '../Styles/DeleteConfirmation.css'


type DeleteConfirmationModalProps = {
    show: boolean;
    onHide: () => void;
    onDeleteConfirm: () => void | undefined;
};

const DeleteConfirmation: FC<DeleteConfirmationModalProps> = ({ show, onHide, onDeleteConfirm }) => {

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 text-center'>
                        <h2>Delete Confirmation</h2>
                    </div>
                    <div className='col-1'>
                        <span className="close" onClick={onHide}>&times;</span>
                    </div>
                </div>
                <div className='text-center f20 mb-4'>
                    Are you sure you want to delete?
                </div>
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button className="cancel-button" onClick={onHide}>Cancel</button>
                    </div>
                    <div className='col-4'>
                        <button className="delete-button" onClick={onDeleteConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation