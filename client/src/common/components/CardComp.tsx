import { Card } from "antd";

interface ICardCompProps {
  actions?: React.ReactNode[] | undefined;
  avatar?: React.ReactNode | undefined;
  title: React.ReactNode | string;
  description?: string;
  content: React.ReactNode;
}

const CardComp = ({ ...props }: ICardCompProps) => {
  return (
    <Card hoverable style={{ marginTop: 16 }} actions={props.actions}>
      <Card.Meta
        avatar={props.avatar}
        title={props.title}
        description={props.description}
      />
      {props.content}
    </Card>
  );
};

export default CardComp;