import React, { useRef } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./style.scss";
import Share from "./share";
const ModalShare = ({ open, setOpen }) => {
  const myRef = useRef(null);
  return (
    <div>
      <div ref={myRef}></div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        center
        closeIcon={
          <div class="customClose">
            <i class="uil uil-times"></i>
          </div>
        }
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <Share />
      </Modal>
    </div>
  );
};

export default ModalShare;
