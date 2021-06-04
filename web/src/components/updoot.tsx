import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootProps {
  post: PostSnippetFragment;
}

export const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const [updootLoading, setUpdootLoading] =
    useState<"upLoading" | "downLoading" | "notLoading">("notLoading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          setUpdootLoading("upLoading");
          await vote({ value: 1, postId: post.id });
          setUpdootLoading("notLoading");
        }}
        isLoading={updootLoading === "upLoading"}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="upvote post"
        icon={<ChevronUpIcon size="24px" />}
      />

      <Box m={2}>{post.points}</Box>

      <IconButton
        onClick={async () => {
          setUpdootLoading("downLoading");
          await vote({ value: -1, postId: post.id });
          setUpdootLoading("notLoading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        isLoading={updootLoading === "downLoading"}
        aria-label="downvote post"
        icon={<ChevronDownIcon size="24px" />}
      />
    </Flex>
  );
};
