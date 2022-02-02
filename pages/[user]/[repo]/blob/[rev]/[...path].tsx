import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/Breadcrumb";
import { defaultInstance } from "@/api/apiClient";
import { uria } from "@/utils/uri";
import HighLight from "react-highlight";

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
  const { user, repo, rev, path: blobPath } = rawQuery as unknown as Query;
  const baseName = blobPath[blobPath.length - 1];
  const splitted = baseName.split(".");
  const extName = splitted.length >= 2 ? splitted[splitted.length - 1] : "txt";
  let content = <div>can't display this content</div>;
  if (["png", "gif", "jpg", "webp"].includes(extName)) {
    content = <img src={`/api/${user}/${repo}/blob/${rev}/${blobPath.join("/")}`} />;
  } else if (["mp3", "mp4", "m4a", "webm"].includes(extName)) {
    content = <video src={`/api/${user}/${repo}/blob/${rev}/${blobPath.join("/")}`} controls />;
  } else {
    content = <HighLight className={extName}>{props.response}</HighLight>;
  }
  return (
    <div className="container">
      <Head>
        <title>
          {blobPath.join("/")} - {user}/{repo} - gitanpot
        </title>
      </Head>
      <Breadcrumb user={user} repo={repo} rev={rev} basePath={blobPath.slice(0, blobPath.length - 1)} />
      <h1>{blobPath[blobPath.length - 1]}</h1>
      {content}
    </div>
  );
};

Blob.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user, repo, rev, path: blobPath } = rawQuery as unknown as Query;
    const path = uria`${user}/${repo}/blob/${rev}/` + blobPath.map((s) => encodeURIComponent(s)).join("/");
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default Blob;
