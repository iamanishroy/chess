import React from "react";
import "./style.scss";
const Share = () => {
  return (
    <>
      <div class="popup">
        <header>
          <span>Share Modal</span>
          <div class="close">
            <i class="uil uil-times"></i>
          </div>
        </header>
        <div class="content">
          <p>Share this link via</p>
          <ul class="icons">
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </ul>
          <p>Or copy link</p>
          <div class="field">
            <i class="url-icon uil uil-link"></i>
            <input type="text" readonly value="example.com/share-link" />
            <button>Copy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
