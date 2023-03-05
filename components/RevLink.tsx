import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  site: string;
  user: string;
  repo: string;
  rev: string;
};

export const RevLink: React.FC<Props> = ({ site, user, repo, rev, children }) => (
  <Link href="/[site]/[user]/[repo]/tree/[rev]" as={uri`/${site}/${user}/${repo}/tree/${rev}`}>
    {children != null ? children : <a>{rev}</a>}
  </Link>
);

export default RevLink;
