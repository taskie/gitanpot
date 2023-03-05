import Link from "next/link";

type Props = Record<string, never>;

export const SiteLink: React.FC<Props> = ({ children }) => (
  <Link href="/">{children != null ? children : <a>gitanpot</a>}</Link>
);

export default SiteLink;
