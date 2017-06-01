"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { Button, Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";


const tabs = ["Upload"];
const termsUrl = "https://clyp.it/terms";


class UploadModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  toggleModal() {
    this.setState({ showModal : !this.state.showModal });
  }

  onDrop(event) {
    this.props.onDrop(event[0])
      .then(() => {
        this.toggleModal();
      });
  }

  render() {
    return (
      <div>
        <Button
          type="submit"
          bsStyle={this.props.bsStyle}
          bsSize={this.props.bsSize}
          onClick={this.toggleModal}>
          Upload
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggleModal} dialogClassName="upload-modal-wrapper">
          <div className="upload-modal">
            <Modal.Body>
              <ul className="source-tabs">
                {tabs.map((tab, i) =>
                  <li key={i} className="tab small-12 columns is-active">{tab}</li>
                )}
              </ul>
              <div className="default-tabs-content upload-tabs">
                <div className="upload-tab tab active">
                  <Dropzone className="dropzone upload-zone" multiple={false} onDrop={this.onDrop}>
                    <div className="upload-icon"></div>
                    <div className="upload-text">
                      Drop in an audio file or click to upload
                    </div>
                  </Dropzone>
                </div>
              </div>
              <div className="terms-clause">
                {"By uploading you agree to our"} <Link to={termsUrl} target="_blank">Terms</Link>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
}

UploadModal.propTypes = {
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
  onDrop: PropTypes.func.isRequired
};

export default UploadModal;
