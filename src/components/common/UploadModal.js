import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const UploadModal = ({ onDrop, styles }) => {
  return (
    <div>
      <button
        className='mdc-button mdc-button--rasied'
        style={styles}
      >
        <Dropzone
          className='dropzone upload-zone'
          multiple={false}
          onDrop={onDrop}
        >
          Upload
        </Dropzone>
      </button>
    </div>
  );
};

UploadModal.propTypes = {
  styles: PropTypes.object,
  onDrop: PropTypes.func.isRequired,
};

export default UploadModal;
