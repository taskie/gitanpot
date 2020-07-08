import TreeEntry from "./TreeEntry";

type Props = {
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
  entries: { hash: string; name: string; mode: number }[];
};

export const TreeEntryList: React.FC<Props> = ({ user, repo, rev, basePath, entries }) => (
  <ul>
    {entries.map((entry) => (
      <TreeEntry key={entry.hash} user={user} repo={repo} rev={rev} basePath={basePath} entry={entry} />
    ))}
  </ul>
);

export default TreeEntryList;
