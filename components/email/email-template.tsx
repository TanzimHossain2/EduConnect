interface Props {
  message: string;
}

export const EmailTemplate: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};
