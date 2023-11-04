import { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalDeleteDialogProps {
    showModal:boolean;
    buttonClickedHandler:Function;
}

const ModalDeleteDialog: React.FC<ModalDeleteDialogProps> = memo(({showModal,buttonClickedHandler}:ModalDeleteDialogProps) => {
    return (
        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Deleting...
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure that you want to delete this item?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => buttonClickedHandler('Yes')}>Yes</Button>
            <Button onClick={() => buttonClickedHandler('No')}>No</Button>
          </Modal.Footer>
        </Modal>
      );
});

export { ModalDeleteDialog };
