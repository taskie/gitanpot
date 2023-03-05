import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  site: string;
};

export const SiteLink: React.FC<Props> = ({ site, children }) => (
  <Link href="/[site]" as={uri`/${site}`}>
    {children != null ? children : <a>{site}</a>}
  </Link>
);

export default SiteLink;
