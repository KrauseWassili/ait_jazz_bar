import User from "../types/User";

const UsersServerVersion = async () => {
  const res = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
    next: {revalidate: 60},
  });

  if (!res.ok) {
    throw Error("Failed to fetch");
  }

  const { users } = await res.json();
  return (
    <div>
      {
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default UsersServerVersion;
