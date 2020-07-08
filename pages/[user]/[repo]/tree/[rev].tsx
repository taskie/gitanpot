import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import TreeEntryList from "../../../../components/TreeEntryList";
import { uria } from "../../../../utils/uri";
import Breadcrumb from "../../../../components/Breadcrumb";

function ensureQueryIsString(s: string | string[]): string {
  if (typeof s === "string") {
    return s;
  } else {
    throw new Error("must be string: " + s);
  }
}

type Query = {
  user: string;
  repo: string;
  rev: string;
};

type Response = {
  ok: boolean;
  entries: { hash: string; name: string; mode: number }[];
  err: any;
};

type Props = { response?: Response };

export const Tree: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { user, repo, rev } = (rawQuery as unknown) as Query;
  return (
    <div className="container">
      <Breadcrumb user={user} repo={repo} rev={rev} basePath={[]} />
      <h1>
        {user} / {repo} ({rev})
      </h1>
      {props.response != null ? (
        <TreeEntryList user={user} repo={repo} rev={rev} basePath={[]} entries={props.response.entries} />
      ) : (
        <p>Some error occured.</p>
      )}
    </div>
  );
};

Tree.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user, repo, rev } = (rawQuery as unknown) as Query;
    const baseURL = "http://localhost:3000";
    const path = baseURL + uria`/api/${user}/${repo}/tree/${rev}/`;
    console.log(path);
    const { data } = await axios.get(path);
    return { response: data };
  } catch (err) {
    return { err: err.message };
  }
};

export default Tree;
