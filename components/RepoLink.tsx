import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  user: string;
  repo: string;
};

export const RepoLink: React.FC<Props> = ({ user, repo, children }) => (
  <Link href="/[user]/[repo]" as={uri`/${user}/${repo}`}>
    {children != null ? children : <a>{repo}</a>}
  </Link>
);

export default RepoLink;
