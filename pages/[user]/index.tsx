import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { uria } from "@/utils/uri";
import { defaultInstance } from "@/api/apiClient";
import RepoLink from "@/components/RepoLink";

type Query = {
  user: string;
  repo: string;
  rev: string;
};

type Response = {
  ok: boolean;
  repos: { name: string }[];
};

type Props = { response?: Response; err?: string };

export const List: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { user } = rawQuery as unknown as Query;
  return (
    <div className="container">
      <Head>
        <title>{user} - gitanpot</title>
      </Head>
      <h1>{user}</h1>
      {props.response != null ? (
        <ul>
          {props.response.repos.map((r) => (
            <li>
              <RepoLink user={user} repo={r.name}></RepoLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>Some error occured: {props.err}</p>
      )}
    </div>
  );
};

List.getInitialProps = async ({ query: rawQuery }) => {
  try {
    const { user } = rawQuery as unknown as Query;
    const path = uria`${user}/`;
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default List;
