import Link from "next/link";

interface AppLinkProps {
  href: string;
  text: string;
  className?: string;
}

const AppLink: React.FC<AppLinkProps> = ({ href, text, className = "" }) => (
  <Link href={href} className={`text-amber-500 hover:underline ${className}`}>
    {text}
  </Link>
);

export default AppLink;
