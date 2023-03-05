import RevLink from "./RevLink";
import TreeLink from "./TreeLink";
import UserLink from "./UserLink";
import RepoLink from "./RepoLink";
import SiteLink from "./SiteLink";

type Props = {
  site: string;
  user: string;
  repo?: string;
  rev?: string;
  basePath?: string[];
};

export const Breadcrumb: React.FC<Props> = ({ site, user, repo, rev, basePath }) => {
  if (repo == null) {
    return (
      <nav>
        <SiteLink site={site} />
        {" / "}
        <UserLink site={site} user={user} />
      </nav>
    );
  }
  let pathPart = undefined;
  if (rev != null && basePath != null) {
    pathPart = basePath.map((comp, i) => {
      const path = basePath.slice(0, i + 1).join("/");
      return (
        <span key={path}>
          {" / "}
          <TreeLink site={site} user={user} repo={repo} rev={rev} path={path}>
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
        / <RevLink site={site} user={user} repo={repo} rev={rev} />
        {pathPart}
      </>
    );
  }
  return (
    <nav>
      <SiteLink site={site} />
      {" / "}
      <UserLink site={site} user={user} />
      {" / "}
      <RepoLink site={site} user={user} repo={repo} />
      {revPart}
    </nav>
  );
};

export default Breadcrumb;
