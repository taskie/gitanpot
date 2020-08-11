import TreeLink from "./TreeLink";
import BlobLink from "./BlobLink";

type Props = {
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
  entry: { hash: string; name: string; mode: number };
};

export const TreeEntry: React.FC<Props> = ({ user, repo, rev, basePath, entry }) => {
  const type = entry.mode === 16384 ? "tree" : "blob";
  const ObjectLink = type === "tree" ? TreeLink : BlobLink;
  return (
    <li>
      <span>{type === "tree" ? "📁" : "📄"}</span>
      <ObjectLink user={user} repo={repo} rev={rev} path={[...basePath, entry.name].join("/")}>
        <a style={{ marginLeft: "0.5rem" }}>{entry.name}</a>
      </ObjectLink>
    </li>
  );
};

export default TreeEntry;
