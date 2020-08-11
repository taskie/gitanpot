import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  user: string;
  repo: string;
  rev: string;
  path: string;
};

export const BlobLink: React.FC<Props> = ({ user, repo, rev, path, children }) => {
  const encPath = path
    .split("/")
    .map((s) => encodeURIComponent(s))
    .join("/");
  return (
    <Link href="/[user]/[repo]/blob/[rev]/[...path]" as={uri`/${user}/${repo}/blob/${rev}/` + encPath}>
      {children != null ? children : <a>{path}</a>}
    </Link>
  );
};

export default BlobLink;
