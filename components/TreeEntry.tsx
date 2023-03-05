import TreeLink from "./TreeLink";
import BlobLink from "./BlobLink";

type Props = {
  site: string;
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
  entry: { hash: string; name: string; mode: number };
};

export const TreeEntry: React.FC<Props> = ({ site, user, repo, rev, basePath, entry }) => {
  const type = entry.mode === 16384 ? "tree" : "blob";
  const ObjectLink = type === "tree" ? TreeLink : BlobLink;
  return (
    <li>
      <span>{type === "tree" ? "📁" : "📄"}</span>
      <ObjectLink site={site} user={user} repo={repo} rev={rev} path={[...basePath, entry.name].join("/")}>
        <a style={{ marginLeft: "0.5rem" }}>{entry.name}</a>
      </ObjectLink>
    </li>
  );
};

export default TreeEntry;
