interface HeadingProps {
  text: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, className = "" }) => (
  <h1 className={`text-3xl text-amber-900 font-bold mb-4 ${className}`}>
    {text}
  </h1>
);

export default Heading;
