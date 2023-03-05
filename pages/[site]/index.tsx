import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { uria } from "@/utils/uri";
import { defaultInstance } from "@/api/apiClient";
import UserLink from "@/components/UserLink";
import TopLink from "@/components/TopLink";

type Query = {
  site: string;
};

type Response = {
  ok: boolean;
  users: { name: string }[];
};

type Props = { response?: Response; err?: string };

export const List: NextPage<Props> = (props) => {
  const router = useRouter();
  const { query: rawQuery } = router;
  const { site } = rawQuery as unknown as Query;
  return (
    <div className="container">
      <Head>
        <title>{site} - gitanpot</title>
      </Head>
      <nav>
        <TopLink></TopLink>
      </nav>
      <h1>{site}</h1>
      {props.response != null ? (
        <ul>
          {props.response.users.map((user) => (
            <li key={user.name}>
              <UserLink site={site} user={user.name}></UserLink>
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
    const { site } = rawQuery as unknown as Query;
    const path = uria`${site}/`;
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default List;
