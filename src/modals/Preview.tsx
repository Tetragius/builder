import React from 'react';
import { Modal } from 'vienna-ui';

export const Preview = ({ isOpen, onClose, url }) => {

    return <Modal isOpen={isOpen} closeIcon={false} onClose={() => onClose('')} >
        <Modal.Layout>
            <div style={{
                backgroundImage: `url(${url})`,
                minWidth: '1024px',
                minHeight: '768px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} />
        </Modal.Layout>
    </Modal >
}
