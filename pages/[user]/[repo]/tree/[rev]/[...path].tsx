import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import TreeEntryList from "../../../../../components/TreeEntryList";
import { uria } from "../../../../../utils/uri";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { defaultInstance } from "../../../../../api/apiClient";

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
  path: string[];
};

type Response = {
  ok: boolean;
  entries: { hash: string; name: string; mode: number }[];
};

type Props = { response?: Response; err?: string };

export const Tree: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { user, repo, rev, path: treePath } = (rawQuery as unknown) as Query;
  return (
    <div className="container">
      <Head>
        <title>
          {treePath.join("/")} - {user}/{repo} - gitanpot
        </title>
      </Head>
      <Breadcrumb user={user} repo={repo} rev={rev} basePath={treePath.slice(0, treePath.length - 1)} />
      <h1>{treePath[treePath.length - 1]}</h1>
      {props.response != null ? (
        <TreeEntryList user={user} repo={repo} rev={rev} basePath={treePath} entries={props.response.entries} />
      ) : (
        <p>Some error occured: {props.err}</p>
      )}
    </div>
  );
};

Tree.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user, repo, rev, path: treePath } = (rawQuery as unknown) as Query;
    const path = uria`${user}/${repo}/tree/${rev}/` + treePath.map(encodeURIComponent).join("/");
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err) {
    console.error(err);
    return { err: err.message };
  }
};

export default Tree;
