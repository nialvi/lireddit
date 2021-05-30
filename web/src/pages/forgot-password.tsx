import { Formik, Form } from "formik";
import { Button, Box } from "@chakra-ui/react";

import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrlqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>we sent reset link on the email</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                label="Email"
                placeholder="input your email"
              />

              <Button
                mt={2}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                forgot email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
