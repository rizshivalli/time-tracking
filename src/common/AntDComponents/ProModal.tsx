import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import React, { FC } from 'react';

const ProModal: FC<ModalProps> = ({ children, ...rest }) => {
  return <Modal {...rest}>{children}</Modal>;
};

export default ProModal;
