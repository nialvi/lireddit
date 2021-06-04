import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/layout";
import { EditAndDeleteButtons } from "../../components/editAndDeleteButtons";
import { createUrqlClient } from "../../utils/createUrlqlClient";
import { Heading, Box } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = () => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading fontSize="xl">{data?.post.title}</Heading>
      <Box mb={4}>{data?.post?.text}</Box>

      <EditAndDeleteButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
