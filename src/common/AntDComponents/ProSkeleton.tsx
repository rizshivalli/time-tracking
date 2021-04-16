import React from 'react';
import type { FC } from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';

interface ProSkeletonProps {
  type: 'list' | 'result' | 'descriptions';
}

const Skeleton: FC<ProSkeletonProps> = () => {
  return <ProSkeleton type="list" />;
};

export default Skeleton;
