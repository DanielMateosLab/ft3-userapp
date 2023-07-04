import { User } from "@/types/user";
import ProfilePic from "@/utils/svg/ProfilePic";

interface UserDataProps {
  user?: Pick<User, "username" | "email">;
}

const UserData: React.FC<UserDataProps> = ({ user }) => {
  return (
    <article className="border p-4 rounded shadow">
      <div className="flex">
        <div className="grow">
          <h2 className="text-xl text-amber-900 font-bold mb-2">
            User Information
          </h2>

          <section>
            <span className="font-bold">Username:</span> {user?.username}
          </section>

          <section>
            <span className="font-bold">Email:</span> {user?.email}
          </section>
        </div>

        <div className="h-24 w-24">
          <ProfilePic />
        </div>
      </div>
    </article>
  );
};

export default UserData;
