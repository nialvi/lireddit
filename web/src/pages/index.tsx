import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { Updoot } from "../components/updoot";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlqlClient";
import {
  Link,
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!data && !fetching) {
    return <div>you got no data or query is failed</div>;
  }

  return (
    <Layout variant="regular">
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((post) => {
            if (!post) {
              return null;
            }

            return (
              <Flex p={5} shadow="md" borderWidth="1px" key={post.id}>
                <Updoot post={post} />

                <Box flex="1">
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>posted by {post.creator.username}</Text>

                  <Flex align="center">
                    <Text flex="1" mt={4}>
                      {post.textSnippet}
                    </Text>

                    <IconButton
                      ml="auto"
                      icon={<DeleteIcon />}
                      aria-label="Delete post"
                      onClick={() => deletePost({ id: post.id })}
                    />
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex mb={4}>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            mt={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
