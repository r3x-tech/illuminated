import theme from "@/styles/theme";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Flex,
  VStack,
  Text,
  Heading,
  Textarea,
} from "@chakra-ui/react";

export function CreateModuleModal() {
  const {
    isOpen: isCreateGameModalOpen,
    onOpen: onCreateGameModalOpen,
    onClose: onCreateGameModalClose,
  } = useDisclosure();

  return (
    <>
      <Button
        onClick={onCreateGameModalOpen}
        variant="outline"
        borderColor={theme.colors.lightBlue}
        border="2px solid"
        borderRadius="2px"
        color={theme.colors.lightBlue}
        w="100%"
        h="3rem"
        fontSize="1rem"
        fontWeight="700"
        fontFamily={theme.fonts.heading}
        _hover={{
          color: theme.colors.background,
          backgroundColor: theme.colors.lightBlue,
          borderColor: theme.colors.lightBlue,
        }}
      >
        NEW MODULE +
      </Button>
      <Modal isOpen={isCreateGameModalOpen} onClose={onCreateGameModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={theme.colors.background}
          color={theme.colors.lightBlue}
        >
          <ModalHeader>
            <Heading fontSize="1.5rem">CREATE MODULE</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack gap="1rem">
              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Module Name
                </Text>
                <Input
                  placeholder="Name your game module"
                  w="100%"
                  h="2rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderWidth="2px"
                  borderRadius="2px"
                  borderColor={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.input}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                  _focus={{ boxShadow: "none" }}
                />
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Module Description
                </Text>
                <Input
                  placeholder="Describe your game module"
                  w="100%"
                  h="2rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderWidth="2px"
                  borderRadius="2px"
                  borderColor={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.input}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                  _focus={{ boxShadow: "none" }}
                />
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Module Image
                </Text>
                <Input
                  placeholder="Enter module image URL"
                  w="100%"
                  h="2rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderWidth="2px"
                  borderRadius="2px"
                  borderColor={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.input}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                  _focus={{ boxShadow: "none" }}
                />
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  module.json
                </Text>
                <Textarea
                  placeholder="Enter your module.json"
                  w="100%"
                  minHeight="4rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderWidth="2px"
                  borderRadius="2px"
                  borderColor={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.input}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                  _focus={{ boxShadow: "none" }}
                  resize="vertical"
                />
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  SaveTemplate.capnp
                </Text>
                <Textarea
                  placeholder="Enter your SaveTemplate"
                  w="100%"
                  minHeight="4rem"
                  fontSize="0.75rem"
                  bg={theme.colors.input}
                  borderWidth="2px"
                  borderRadius="2px"
                  borderColor={theme.colors.input}
                  fontWeight="500"
                  letterSpacing="1px"
                  color={theme.colors.lightBlue}
                  focusBorderColor={theme.colors.input}
                  _placeholder={{ color: theme.colors.evenLighterBlue }}
                  _focus={{ boxShadow: "none" }}
                  resize="vertical"
                />
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" w="100%" py="0.75rem">
              <Button
                onClick={onCreateGameModalClose}
                variant="outline"
                borderColor={theme.colors.lightBlue}
                border="2px solid"
                borderRadius="2px"
                color={theme.colors.lightBlue}
                w="47%"
                h="2.5rem"
                fontSize="0.75rem"
                fontWeight="700"
                fontFamily={theme.fonts.heading}
              >
                CANCEL
              </Button>
              <Button
                onClick={() => {}}
                variant="outline"
                borderColor={theme.colors.lightBlue}
                backgroundColor={theme.colors.lightBlue}
                borderWidth="2px"
                borderRadius="2px"
                color={theme.colors.background}
                w="47%"
                h="2.5rem"
                fontSize="0.75rem"
                fontWeight="800"
                fontFamily={theme.fonts.heading}
                _hover={{
                  color: theme.colors.background,
                  backgroundColor: theme.colors.lightBlue,
                  borderColor: theme.colors.lightBlue,
                }}
              >
                CREATE
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
