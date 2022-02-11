import RevLink from "./RevLink";
import TreeLink from "./TreeLink";
import UserLink from "./UserLink";
import RepoLink from "./RepoLink";

type Props = {
  user: string;
  repo: string;
  rev?: string;
  basePath?: string[];
};

export const Breadcrumb: React.FC<Props> = ({ user, repo, rev, basePath }) => {
  let pathPart = undefined;
  if (rev != null && basePath != null) {
    pathPart = basePath.map((comp, i) => {
      const path = basePath.slice(0, i + 1).join("/");
      return (
        <span key={path}>
          {" / "}
          <TreeLink user={user} repo={repo} rev={rev} path={path}>
            <a>{comp}</a>
          </TreeLink>
        </span>
      );
    });
  }
  let revPart = undefined;
  if (rev != null) {
    revPart = (
      <>
        {" "}
        / <RevLink user={user} repo={repo} rev={rev} />
        {pathPart}
      </>
    );
  }
  return (
    <nav>
      <UserLink user={user} />
      {" / "}
      <RepoLink user={user} repo={repo} />
      {revPart}
    </nav>
  );
};

export default Breadcrumb;
