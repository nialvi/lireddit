import { Box } from "@chakra-ui/react";

export type WrapperVariants = "small" | "regular";
interface wrapperProps {
  variant?: WrapperVariants;
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt="8px"
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
