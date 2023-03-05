import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  site: string;
  user: string;
};

export const UserLink: React.FC<Props> = ({ site, user, children }) => (
  <Link href="/[site]/[user]" as={uri`/${site}/${user}`}>
    {children != null ? children : <a>{user}</a>}
  </Link>
);

export default UserLink;
