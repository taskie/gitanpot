import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { defaultRequestConfig } from "../../../../../api/apiClient";
import { uria } from "../../../../../utils/uri";

type Response = {
  ok: boolean;
  err: any;
};

type Query = {
  user: string;
  repo: string;
  rev: string;
  path: string[];
};

type Props = { response?: Response };

export const Blob: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { user, repo, rev, path: blobPath } = (rawQuery as unknown) as Query;
  return (
    <div className="container">
      <Breadcrumb user={user} repo={repo} rev={rev} basePath={blobPath.slice(0, blobPath.length - 1)} />
      <h1>{blobPath[blobPath.length - 1]}</h1>
      <pre>{props.response}</pre>
    </div>
  );
};

Blob.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user, repo, rev, path: blobPath } = (rawQuery as unknown) as Query;
    const path = uria`${user}/${repo}/blob/${rev}` + blobPath.join("/");
    const { data } = await axios.get(path, { ...defaultRequestConfig });
    return { response: data };
  } catch (err) {
    return { err: err.message };
  }
};

export default Blob;
