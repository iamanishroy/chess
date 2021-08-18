import React, { useState } from "react";
import "./style.scss";
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const iconSize = "48";
const iconRound = true;
const Share = ({ close, link }) => {
  const [copy, setCopy] = useState("copy");
  return (
    <>
      <div className="popup">
        <header>
          <span>Share</span>
          <div className="close" onClick={close}>
            X
          </div>
        </header>
        <div className="content">
          <p>Share this link via</p>
          <ul className="icons">
            <span>
              <LinkedinShareButton url={link}>
                <LinkedinIcon size={iconSize} round={iconRound} />
              </LinkedinShareButton>
            </span>
            <span>
              <TwitterShareButton url={link}>
                <TwitterIcon size={iconSize} round={iconRound} />
              </TwitterShareButton>
            </span>
            <span>
              <TelegramShareButton url={link}>
                <TelegramIcon size={iconSize} round={iconRound} />
              </TelegramShareButton>
            </span>
            <span>
              <WhatsappShareButton url={link}>
                <WhatsappIcon size={iconSize} round={iconRound} />
              </WhatsappShareButton>
            </span>
            <span>
              <FacebookShareButton url={link}>
                <FacebookIcon size={iconSize} round={iconRound} />
              </FacebookShareButton>
            </span>
          </ul>
          <p>Or copy link</p>
          <div className="field">
            🔗
            <input type="text" readOnly defaultValue={link} />
            <div className="share_modal_btn">
              <CopyToClipboard
                text={link}
                onCopy={() => {
                  setCopy("copied");
                }}
              >
                <button>{copy}</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
