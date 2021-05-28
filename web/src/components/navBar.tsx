import { Box, Flex } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface navBarProps {}

export const NavBar: React.FC<navBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = "...";
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>

        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
