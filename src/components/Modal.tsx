
interface ModalProps {
    show: boolean;
    handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Produit déjà dans le panier</h5>
                    </div>
                    <div className="modal-body">
                        <p>Le produit est déjà dans le panier, sa quantité a été augmentée.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleClose}>Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
