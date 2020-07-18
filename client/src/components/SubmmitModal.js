import React from 'react';
import Spinner from './Spinner';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function SubmmitModal({ message }) {
  return (
    <div style={styles.submmit}>
      <Modal isOpen={true}>
        <div style={styles.submmit}>
          <h3 className="center">{message}</h3>
          {message === 'Realizando operação...' && <Spinner />}
          {message === 'Carregando...' && <Spinner />}
          {message !== 'Carregando...' &&
            message !== 'Realizando operação...' && (
              <img
                src="checked.jpg"
                alt="submmited sucessfully"
                width="170px"
                height="170px"
              />
            )}
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  submmit: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    // justifyContent: 'center',

    margin: 'auto',
    padding: '100px',
  }
};
