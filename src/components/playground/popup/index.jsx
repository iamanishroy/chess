import React, { useCallback, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Share from "./share";
import "./style.scss";

const ShareModal = ({ showModal = false, setShowModal, link = "" }) => {
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div className="modal-bg" onClick={closeModal}>
          <animated.div style={animation}>
            <Share close={closeModal} link={link} />
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default ShareModal;
