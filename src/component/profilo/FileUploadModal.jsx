import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../redux/actions";

function FileUploadModal({ show, handleClose }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const reloadPic = () => {
    const token = localStorage.getItem("token");
    dispatch(fetchUserDetails(token));
  };
  const handleUpload = () => {
    if (!file) {
      alert("Nessun file selezionato.");
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    fetch(apiUrl + "/utenti/upload-avatar", {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il caricamento del file.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("File caricato con successo:", data);
        reloadPic();
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
    console.log("File selezionato:", file);

    // Chiudi il modale
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carica un file</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile">
            <Form.Label>Seleziona un file</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Carica
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileUploadModal;
