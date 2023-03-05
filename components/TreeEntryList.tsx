import TreeEntry from "./TreeEntry";

type Props = {
  site: string;
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
  entries: { hash: string; name: string; mode: number }[];
};

export const TreeEntryList: React.FC<Props> = ({ site, user, repo, rev, basePath, entries }) => (
  <ul>
    {entries.map((entry) => (
      <TreeEntry key={entry.hash} site={site} user={user} repo={repo} rev={rev} basePath={basePath} entry={entry} />
    ))}
  </ul>
);

export default TreeEntryList;
