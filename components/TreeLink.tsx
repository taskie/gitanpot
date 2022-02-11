import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  user: string;
  repo: string;
  rev: string;
  path?: string;
};

export const TreeLink: React.FC<Props> = ({ user, repo, rev, path, children }) => {
  if (path != null) {
    const encPath = path
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/");
    return (
      <Link href="/[user]/[repo]/tree/[rev]/[...path]" as={uri`/${user}/${repo}/tree/${rev}/` + encPath}>
        {children != null ? children : <a>{path}</a>}
      </Link>
    );
  } else {
    return (
      <Link href="/[user]/[repo]/tree/[rev]" as={uri`/${user}/${repo}/tree/${rev}`}>
        {children != null ? children : <a>{rev}</a>}
      </Link>
    );
  }
};

export default TreeLink;
