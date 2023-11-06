import { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalDeleteDialogProps {
    showModal:boolean;
    buttonClickedHandler:Function;
    title:string;
    bodyText:string;
}

const ModalDeleteDialog: React.FC<ModalDeleteDialogProps> = memo(({showModal,buttonClickedHandler, title, bodyText}:ModalDeleteDialogProps) => {
    return (
        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {bodyText}
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
