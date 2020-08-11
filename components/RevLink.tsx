import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  user: string;
  repo: string;
  rev: string;
};

export const RevLink: React.FC<Props> = ({ user, repo, rev, children }) => (
  <Link href="/[user]/[repo]/tree/[rev]" as={uri`/${user}/${repo}/tree/${rev}`}>
    {children != null ? children : <a>{rev}</a>}
  </Link>
);

export default RevLink;
