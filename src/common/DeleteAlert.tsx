import { Modal, Typography } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import ProModal from './AntDComponents/ProModal';

interface DeleteAlertProps {
  info: any;
  visible: boolean;
  hideModal: () => void;
  deleteAPI: any;
  onSuccess?: any;
}

const DeleteAlert: FC<DeleteAlertProps> = ({ info, visible, hideModal, deleteAPI, onSuccess }) => {
  const [pending, setPending] = useState(false);

  const afterSuccess = () => {
    if (onSuccess) {
      onSuccess();
      hideModal();
    }
    hideModal();
  };
  const handleFinish = useCallback(() => {
    setPending(true);
    deleteAPI(info)
      .then(() => {
        Modal.success({
          title: 'Success',
          content: 'Item deleted successfully',
          onOk: afterSuccess,
        });
      })
      .catch((error: any) => {
        const { data } = error;
        Modal.error({
          title: 'Error',
          content: data.message ? data.message : 'Error occured while deleting please try again',
        });
      })
      .finally(() => {
        setPending(false);
      });
  }, [setPending, hideModal]);

  return (
    <ProModal
      title="Delete Selected Item?"
      visible={visible}
      closable={!pending}
      maskClosable={!pending}
      destroyOnClose
      onOk={() => handleFinish()}
      onCancel={hideModal}
      okText={pending ? 'Loading...' : 'Ok'}
      okButtonProps={{ loading: pending, disabled: pending }}
      cancelButtonProps={{ disabled: pending }}
    >
      <Typography>Are you sure you want to delete this item?</Typography>
    </ProModal>
  );
};

export default DeleteAlert;
