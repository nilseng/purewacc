import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AdminModal = (props: any) => {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      something
    </Modal>
  );
};

export default AdminModal;
