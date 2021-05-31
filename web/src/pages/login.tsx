import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { createUrqlClient } from "../utils/createUrlqlClient";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username or Email"
              placeholder="Username or Email"
            />

            <Box mt={2}>
              <InputField
                name="password"
                label="password"
                placeholder="Password"
                type="password"
              />
            </Box>

            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto" color="dodgerblue">
                  forgot password?
                </Link>
              </NextLink>
            </Flex>

            <Button
              mt={2}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
