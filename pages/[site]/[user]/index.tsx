import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { uria } from "@/utils/uri";
import { defaultInstance } from "@/api/apiClient";
import RepoLink from "@/components/RepoLink";
import Breadcrumb from "@/components/Breadcrumb";

type Query = {
  site: string;
  user: string;
};

type Response = {
  ok: boolean;
  repos: { name: string }[];
};

type Props = { response?: Response; err?: string };

export const List: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { site, user } = rawQuery as unknown as Query;
  return (
    <div className="container">
      <Head>
        <title>{user} - gitanpot</title>
      </Head>
      <Breadcrumb site={site} user={user} />
      <h1>{user}</h1>
      {props.response != null ? (
        <ul>
          {props.response.repos.map((r) => (
            <li key={r.name}>
              <RepoLink site={site} user={user} repo={r.name}></RepoLink>
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
    const { site, user } = rawQuery as unknown as Query;
    const path = uria`${site}/${user}/`;
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default List;
