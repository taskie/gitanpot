import { NextPage } from "next";
import Head from "next/head";
import { uria } from "@/utils/uri";
import { defaultInstance } from "@/api/apiClient";
import SiteLink from "@/components/SiteLink";

type Response = {
  ok: boolean;
  sites: { name: string }[];
};

type Props = { response?: Response; err?: string };

export const List: NextPage<Props> = (props) => {
  return (
    <div className="container">
      <Head>
        <title>gitanpot</title>
      </Head>
      <h1>gitanpot</h1>
      {props.response != null ? (
        <ul>
          {props.response.sites.map((site) => (
            <li key={site.name}>
              <SiteLink site={site.name}></SiteLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>Some error occured: {props.err}</p>
      )}
    </div>
  );
};

List.getInitialProps = async () => {
  try {
    const path = uria`/`;
    const { data } = await defaultInstance.get(path);
    return { response: data };
  } catch (err: any) {
    // console.error(err);
    return { err: err.message };
  }
};

export default List;
