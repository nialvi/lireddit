import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlqlClient";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <br />
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
