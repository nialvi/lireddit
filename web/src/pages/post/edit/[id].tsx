import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../../../components/inputField";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrlqlClient";
import { Layout } from "../../../components/layout";
import { useIsAuth } from "../../../utils/useIsAuth";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import router from "next/router";

const EditPost: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [, udpatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          const { error } = await udpatePost({
            id: data?.post?.id as number,
            ...values,
          });

          if (!error) {
            router.back();
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
              edit post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
