import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlqlClient";
import {
  Link,
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  if (!data && !fetching) {
    return <div>you got no data or query is failed</div>;
  }

  return (
    <Layout variant="regular">
      <Flex mt={8} mb={8} align="center">
        <Heading>LiReddit</Heading>

        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((post) => {
            return (
              <Box p={5} shadow="md" borderWidth="1px" key={post.id}>
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            );
          })}
        </Stack>
      )}

      {data ? (
        <Flex mb={4}>
          <Button isLoading={fetching} m="auto" mt={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
