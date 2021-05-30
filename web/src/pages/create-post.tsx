import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/inputField";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrlqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });

          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="Title" />

            <Box mt={2}>
              <InputField
                textarea
                name="text"
                label="Text"
                placeholder="body..."
              />
            </Box>

            <Button
              mt={2}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
