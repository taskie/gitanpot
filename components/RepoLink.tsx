import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  site: string;
  user: string;
  repo: string;
};

export const RepoLink: React.FC<Props> = ({ site, user, repo, children }) => (
  <Link href="/[site]/[user]/[repo]" as={uri`/${site}/${user}/${repo}`}>
    {children != null ? children : <a>{repo}</a>}
  </Link>
);

export default RepoLink;
