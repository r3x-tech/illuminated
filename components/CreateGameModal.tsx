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
} from "@chakra-ui/react";
import ChakraReactSelect from "./ChakraReactSelect";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
// import * as anchor from "@project-serum/anchor";
import { ShdwDrive } from "@shadow-drive/sdk";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// type OptionType = {
//   value: string;
//   label: string;
// };

// const options: OptionType[] = [
//   { value: "module1", label: "Module 1" },
//   { value: "module2", label: "Module 2" },
//   { value: "module3", label: "Module 3" },
// ];

type FormData = {
  gameName: string;
  gameDescription: string;
  gameCoverArt: string;
  // gameplayMedia: string;
  // modules: OptionType[];
};

function truncateFilename(filename: string, maxLength = 30) {
  if (filename.length <= maxLength || !filename.includes(".")) return filename;

  const lastDotIndex = filename.lastIndexOf(".");
  const fileExtension = filename.slice(lastDotIndex);
  const threeCharsBeforeDot = filename.slice(lastDotIndex - 5, lastDotIndex);
  const mainPartLength =
    maxLength - threeCharsBeforeDot.length - fileExtension.length - 3; // -3 for "..."
  if (mainPartLength <= 0) return `...${threeCharsBeforeDot}${fileExtension}`;
  return `${filename.slice(
    0,
    mainPartLength
  )}...${threeCharsBeforeDot}${fileExtension}`;
}

export function CreateGameModal() {
  const {
    isOpen: isCreateGameModalOpen,
    onOpen: onCreateGameModalOpen,
    onClose: onCreateGameModalClose,
  } = useDisclosure();
  const { connection } = useConnection();
  const wallet = useWallet();

  // const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { handleSubmit, control, formState } = useForm<FormData>();
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    //create storage account
    //upload metadata
    //
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const drive = await new ShdwDrive(connection, wallet).init();
        console.log(drive);
      }
    })();
  }, [wallet?.publicKey]);

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
        NEW GAME +
      </Button>
      <Modal isOpen={isCreateGameModalOpen} onClose={onCreateGameModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={theme.colors.background}
          color={theme.colors.lightBlue}
        >
          <ModalHeader>
            <Heading fontSize="1.5rem">CREATE GAME</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack as="form" gap="1rem" onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Name
                </Text>
                <Controller
                  name="gameName"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Name your game"
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
                  )}
                />

                {errors.gameName && <span>Game name is required</span>}
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Description
                </Text>
                <Controller
                  name="gameDescription"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Describe your game"
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
                  )}
                />
                {errors.gameDescription && (
                  <span>Game description is required</span>
                )}
              </Flex>

              <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Cover Art
                </Text>
                <Flex alignItems="end" marginBottom="0.5rem">
                  {/* Image Preview or Placeholder */}
                  {selectedFile ? (
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      marginRight="1rem"
                    >
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected cover art"
                        style={{
                          borderRadius: "4px",
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Flex>
                  ) : (
                    <Flex
                      align="center"
                      justifyContent="center"
                      boxSize="100px"
                      backgroundColor={theme.colors.input}
                      borderRadius="4px"
                      marginRight="1rem"
                    >
                      <Text
                        textAlign="center"
                        w="80%"
                        color={theme.colors.lightBlue}
                        fontSize="0.75rem"
                      >
                        No image selected
                      </Text>
                    </Flex>
                  )}

                  <Flex
                    alignItems="start"
                    justifyContent="center"
                    borderRadius="4px"
                    flexDirection="column"
                    marginRight="1rem"
                    gap={2}
                  >
                    {selectedFile ? (
                      <Text fontSize="0.75rem">
                        {selectedFile && truncateFilename(selectedFile.name)}
                      </Text>
                    ) : (
                      <Text
                        w="100%"
                        h="100%"
                        color={theme.colors.lightBlue}
                        fontSize="0.75rem"
                      ></Text>
                    )}
                    <Controller
                      name="gameCoverArt"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <label
                          style={{
                            display: "inline-block",
                            width: "auto",
                            padding: "0.5rem 1rem",
                            fontSize: "0.75rem",
                            backgroundColor: theme.colors.background,
                            borderWidth: "2px",
                            borderRadius: "2px",
                            borderColor: theme.colors.lightBlue,
                            fontWeight: "500",
                            letterSpacing: "1px",
                            color: theme.colors.lightBlue,
                            cursor: "pointer",
                          }}
                        >
                          Select Image
                          <Input
                            {...field}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                setSelectedFile(e.target.files[0]);
                                field.onChange(e.target.files[0].name);
                              } else {
                                setSelectedFile(null);
                                field.onChange("");
                              }
                            }}
                            style={{
                              display: "none",
                            }}
                            value=""
                          />
                        </label>
                      )}
                    />
                  </Flex>
                </Flex>
                {errors.gameCoverArt && <span>Game cover art is required</span>}
              </Flex>
              {/* <Flex flexDirection="column" w="100%" mt="0rem">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Gameplay Media
                </Text>
                <Controller
                  name="gameplayMedia"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter an image URL"
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
                  )}
                />
                {errors.gameplayMedia && (
                  <span>Gameplay media URL is required</span>
                )}
              </Flex> */}
              {/* <Flex flexDirection="column" w="100%">
                <Text
                  fontWeight="600"
                  fontFamily={theme.fonts.heading}
                  fontSize="0.75rem"
                  pb="0.25rem"
                >
                  Game Modules
                </Text>
                <Controller
                  name="modules"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <ChakraReactSelect
                      {...field}
                      isMulti
                      options={options}
                      placeholder="Select modules"
                    />
                  )}
                />
                {errors.modules && <span>At least one module is required</span>}
              </Flex> */}
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
                fontWeight="600"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="outline"
                borderColor={theme.colors.lightBlue}
                backgroundColor={theme.colors.lightBlue}
                borderWidth="2px"
                borderRadius="2px"
                color={theme.colors.background}
                w="47%"
                h="2.5rem"
                fontSize="0.75rem"
                fontWeight="700"
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
