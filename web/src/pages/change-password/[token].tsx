import { NextPage } from "next";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Button, Box, Link, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

import { Wrapper } from "../../components/wrapper";
import { InputField } from "../../components/inputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrlqlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              placeholder="new password"
              type="password"
            />
            {tokenError && (
              <Flex>
                <Box mr={4} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link color="dodgerblue">click here to get a new one</Link>
                </NextLink>
              </Flex>
            )}

            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

// @ts-ignore TODO
export default withUrqlClient(createUrqlClient)(ChangePassword);
