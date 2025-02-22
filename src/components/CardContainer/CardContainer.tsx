import { Card } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title:string
    
  }

const CardContainer:React.FC<CardProps> = ({children, title}) => {
  return (
    <Card  title={<Title level={5}>{title}</Title>}>
    {children}
    </Card>
  )
}

export default CardContainer