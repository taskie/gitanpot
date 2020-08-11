import Link from "next/link";
import { uri } from "@/utils/uri";

type Props = {
  user: string;
};

export const UserLink: React.FC<Props> = ({ user, children }) => (
  <Link href="/[user]" as={uri`/${user}`}>
    {children != null ? children : <a>{user}</a>}
  </Link>
);

export default UserLink;
