import '../../Styles/Invoice.css'

const InvoicePopup = ({ invoiceData, onClose }: any) => {
    const { room_charges, medicine_charges, total } = invoiceData;

    return (
        <div className="invoice-popup">
            <div className="invoice-header">
                <h2>Invoice</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <hr/>
            <div className="invoice-details">
                <h3>Room Charges:</h3>
                <p>Room Type: {room_charges.room_type}</p>
                <p>Charges per Day: {room_charges.charges}</p>
                <p>No. of Days: {room_charges.no_of_days}</p>
                <p>Total Room Charges: {room_charges.room_total}</p>
                {/* Add medicine charges if any */}
                {medicine_charges.length > 0 && (
                    <div>
                        <h3>Medicine Charges:</h3>
                        {/* Display medicine charges */}
                        {medicine_charges.map((medicine: any, index: any) => (
                            <p key={index}>{medicine.name}: {medicine.amount}</p>
                        ))}
                    </div>
                )}
                <hr/>
                <h3>Total Amount: {total}</h3>
            </div>
        </div>
    );
};

export default InvoicePopup;
