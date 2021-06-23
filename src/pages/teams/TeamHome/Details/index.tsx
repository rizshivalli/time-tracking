import React from 'react';
import { useState } from 'react';
import './index.less';

const TeamDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  return <h1>Team Details</h1>;
};

export default TeamDetails;
