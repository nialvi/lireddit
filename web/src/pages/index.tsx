import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { EditAndDeleteButtons } from "../components/editAndDeleteButtons";
import { Layout } from "../components/layout";
import { Updoot } from "../components/updoot";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

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

                    <Box ml="auto">
                      <EditAndDeleteButtons
                        id={post.id}
                        creatorId={post.creator.id}
                      />
                    </Box>
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
