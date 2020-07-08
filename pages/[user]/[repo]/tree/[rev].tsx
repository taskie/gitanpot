import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import TreeEntryList from "../../../../components/TreeEntryList";
import { uria } from "../../../../utils/uri";
import Breadcrumb from "../../../../components/Breadcrumb";
import { defaultRequestConfig } from "../../../../api/apiClient";

type Query = {
  user: string;
  repo: string;
  rev: string;
};

type Response = {
  ok: boolean;
  entries: { hash: string; name: string; mode: number }[];
};

type Props = { response?: Response; err?: string };

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
        <p>Some error occured: {props.err}</p>
      )}
    </div>
  );
};

Tree.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user, repo, rev } = (rawQuery as unknown) as Query;
    const path = uria`${user}/${repo}/tree/${rev}/`;
    const { data } = await axios.get(path, { ...defaultRequestConfig });
    return { response: data };
  } catch (err) {
    return { err: err.message };
  }
};

export default Tree;
