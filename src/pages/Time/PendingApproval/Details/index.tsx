import { ProGridContainer } from '@/common';
import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { getPendingApprovalByID } from '../../service';

const ApprovalDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>({});
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ ApprovalDetails ~ data', data);

  const getDataForApproval = async () => {
    setLoading(true);
    await getPendingApprovalByID(id)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataForApproval();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col>Details</Col>
      </Row>
    </ProGridContainer>
  );
};

export default ApprovalDetails;
