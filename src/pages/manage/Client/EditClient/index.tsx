import { ProDivider, ProGridContainer, ProIntlProvider, ProSkeleton, ProTitle } from '@/common';
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { editClientById, getClientById } from '../service';
import { history } from 'umi';

const EditClient = (props: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 8 ~ EditClient ~ props', props);

  const [form] = ProForm.useForm();
  const [clientID] = useState<string>(props?.match?.params?.id);
  const [data, setData] = useState<any>();
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ EditClient ~ data', data);
  const [loading, setLoading] = useState<boolean>(false);

  const onClientEdited = () => {
    getData();
  };

  const handleFinish = useCallback(async (values) => {
    await editClientById(clientID, values)
      .then((result) => {
        if (result) {
          Modal.success({
            title: 'Success',
            content: 'Client Edited Successfully.',
            onOk: onClientEdited,
          });
        }
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error.message });
      });
  }, []);

  const getData = async () => {
    setLoading(true);
    await getClientById(clientID)
      .then((client) => {
        setData(client);
      })
      .catch((error) => {
        Modal.error({ title: 'Error', content: error });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col>
          {loading ? (
            <ProSkeleton type="descriptions" />
          ) : (
            <ProIntlProvider>
              <ProTitle size={3}>{data?.name}</ProTitle>
              <ProDivider />
              <ProForm
                onFinish={(values) => {
                  handleFinish(values);
                  return Promise.resolve();
                }}
                onReset={() => {
                  history.goBack();
                  form.resetFields();
                }}
                submitter={{
                  searchConfig: {
                    submitText: 'Edit Client',
                    resetText: 'Cancel',
                  },
                }}
              >
                <ProFormText name="name" label="Client Name" width="lg" initialValue={data?.name} />
                <ProFormTextArea
                  width="lg"
                  name="address"
                  label="Address"
                  initialValue={data?.address}
                />
              </ProForm>
            </ProIntlProvider>
          )}
        </Col>
      </Row>
    </ProGridContainer>
  );
};

export default EditClient;
