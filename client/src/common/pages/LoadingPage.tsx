import { Spin } from "antd";

interface ILoadingPageProps {
  message: string;
}

const LoadingPage = ({ message }: ILoadingPageProps) => {
  return (
    <Spin
      tip={message}
      size="large"
      style={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default LoadingPage;
