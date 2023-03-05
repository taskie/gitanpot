import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  site: string;
  user: string;
  repo: string;
  rev: string;
  path: string;
};

export const BlobLink: React.FC<Props> = ({ site, user, repo, rev, path, children }) => {
  const encPath = path
    .split("/")
    .map((s) => encodeURIComponent(s))
    .join("/");
  return (
    <Link href="/[site]/[user]/[repo]/blob/[rev]/[...path]" as={uri`/${site}/${user}/${repo}/blob/${rev}/` + encPath}>
      {children != null ? children : <a>{path}</a>}
    </Link>
  );
};

export default BlobLink;
