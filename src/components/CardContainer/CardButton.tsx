import { Space } from 'antd';
import { ReactNode } from 'react';

interface ActionButtonsProps {
  children: ReactNode; // Botones pasados como children
}

const ActionButtons = ({ children }: ActionButtonsProps) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '16px',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '1rem',
      }}
    >
      <Space>
        {children}
      </Space>
    </div>
  );
};

export default ActionButtons;