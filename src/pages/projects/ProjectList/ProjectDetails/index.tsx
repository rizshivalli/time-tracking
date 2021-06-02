import { ProGridContainer } from '@/common';
import { Col, Row, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProjectsById, getTeamMates, editProjectsById } from '../../service';

const ProjectDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const getProjectData = async () => {
    setLoading(true);
    await getProjectsById(id)
      .then((projects) => {
        setData(projects);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx ~ line 30 ~ getProjectData ~ err', err);
        Modal.error({ title: 'Error', content: err });      
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProGridContainer>
      <Row>
        <Col>Project Details</Col>
      </Row>
    </ProGridContainer>
  );
};

export default ProjectDetails;
