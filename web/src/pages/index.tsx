import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/navBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
