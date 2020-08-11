import Link from "next/link";

type Props = {
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
  entry: { hash: string; name: string; mode: number };
};

export const TreeEntry: React.FC<Props> = ({ user, repo, rev, basePath, entry }) => {
  const type = entry.mode === 16384 ? "tree" : "blob";
  return (
    <li>
      <span>{type === "tree" ? "📁" : "📄"}</span>
      <Link href={"/" + [user, repo, type, rev, ...basePath, entry.name].map(encodeURIComponent).join("/")}>
        <a style={{ marginLeft: "0.5rem" }}>{entry.name}</a>
      </Link>
    </li>
  );
};

export default TreeEntry;
