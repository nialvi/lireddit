import { Link, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

type Props = {
  id: number;
  creatorId: number;
};

export const EditAndDeleteButtons = ({ id, creatorId }: Props) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (data?.me?.id !== creatorId) {
    return null;
  }

  return (
    <>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          mr="4"
          as={Link}
          icon={<EditIcon />}
          aria-label="Edit post"
        />
      </NextLink>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete post"
        onClick={() => deletePost({ id })}
      />
    </>
  );
};
