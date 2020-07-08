import Link from "next/link";
import { uri } from "../utils/uri";

type Props = {
  user: string;
  repo: string;
  rev: string;
  basePath: string[];
};

export const Breadcrumb: React.FC<Props> = ({ user, repo, rev, basePath }) => {
  return (
    <nav>
      <Link href={uri`/${user}/`}>
        <a>{user}</a>
      </Link>
      {" / "}
      <Link href={uri`/${user}/${repo}/`}>
        <a>{repo}</a>
      </Link>
      {" / "}
      <Link href={uri`/${user}/${repo}/tree/${rev}`}>
        <a>{rev}</a>
      </Link>
      {basePath.map((comp, i) => (
        <>
          {" / "}
          <Link
            href={
              uri`/${user}/${repo}/tree/${rev}/` +
              basePath
                .slice(0, i + 1)
                .map(encodeURIComponent)
                .join("/")
            }
          >
            <a>{comp}</a>
          </Link>
        </>
      ))}
    </nav>
  );
};

export default Breadcrumb;
