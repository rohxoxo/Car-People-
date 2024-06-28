import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditButton = ({ onClick }) => {
  return (
    <Button type="primary" icon={<EditOutlined />} onClick={onClick}>
      Edit
    </Button>
  );
};

export default EditButton;
