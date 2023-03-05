import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { uria } from "@/utils/uri";
import { defaultInstance } from "@/api/apiClient";
import TreeLink from "@/components/TreeLink";
import Breadcrumb from "@/components/Breadcrumb";

type Query = {
  site: string;
  user: string;
  repo: string;
};

type Response = {
  ok: boolean;
  branches: { short_name: string }[];
};

type Props = { response?: Response; err?: string };

export const List: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { site, user, repo } = rawQuery as unknown as Query;
  return (
    <div className="container">
      <Head>
        <title>
          {user} / {repo} - gitanpot
        </title>
      </Head>
      <Breadcrumb site={site} user={user} repo={repo} />
      <h1>
        {user} / {repo}
      </h1>
      {props.response != null ? (
        <ul>
          {props.response.branches.map((b) => (
            <li key={b.short_name}>
              <TreeLink site={site} user={user} repo={repo} rev={b.short_name} />
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
    const { site, user, repo } = rawQuery as unknown as Query;
    const path = uria`${site}/${user}/${repo}`;
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default List;
