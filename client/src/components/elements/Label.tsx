interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  labelStyle?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, labelStyle }) => {
  return (
    <label htmlFor={htmlFor} className={labelStyle}>
      {children}
    </label>
  );
};

export default Label;
