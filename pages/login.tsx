import { Button, Input, Stack, Text } from "@chakra-ui/react";

function LoginPage() {
  return (
    <Stack spacing={4}>
      <Text fontSize="2xl">LIBERTÉ</Text>
      <Input placeholder="LOGIN W/ EMAIL" />
      <Input placeholder="LOGIN W/ SOLANA" />
      <Button>Login</Button>
    </Stack>
  );
}

export default LoginPage;
