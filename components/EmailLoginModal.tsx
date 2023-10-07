import { useMagic } from "../contexts/MagicProvider";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import userStore from "@/stores/userStore";
import { FaEnvelope } from "react-icons/fa";
import theme from "@/styles/theme";

interface EmailLoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailLoginModal: React.FC<EmailLoginModalProps> = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
}) => {
  const { magic } = useMagic();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { username } = userStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   if (isAuthenticated && user && !loggedIn && username.trim() == "") {
  //     userStore.setState({
  //       loggedIn: true,
  //       loginType: "WALLET",
  //       username: user.verifiedCredentials[0].address,
  //       solana_wallet_address: user.verifiedCredentials[0].address,
  //     });
  //     setIsLoginModalOpen(false);
  //     toast.success("Logged in");
  //   }
  // }, [isAuthenticated, loggedIn, user, username]);

  const handleLogin = async () => {
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }

    console.log("running");

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      console.log("email error");
      setEmailError(true);
    } else {
      try {
        setLoginInProgress(true);
        setEmailError(false);
        console.log("magic: ", magic);

        const account = await magic?.auth.loginWithEmailOTP({
          email,
          showUI: true,
        });

        if (account) {
          const metadata = await magic?.user.getInfo();
          userStore.setState({
            loggedIn: true,
            loginType: "EMAIL",
            username: metadata?.email || "",
            solana_wallet_address: metadata?.publicAddress || "",
          });
          setEmail("");
        } else {
          console.log("no account");
        }
      } catch (e) {
        console.log("login error: " + JSON.stringify(e));
        if (e instanceof RPCError) {
          switch (e.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              toast.error(`${e.message}`);
              break;
            default:
              toast.error("Something went wrong. Please try again");
          }
        }
      } finally {
        setLoginInProgress(false);
      }
    }
  };

  return (
    <>
      <Button
        leftIcon={<FaEnvelope size="1rem" />}
        variant="outline"
        borderColor={theme.colors.white}
        border="2px solid white"
        borderRadius="2px"
        color={theme.colors.white}
        width="100%"
        fontSize="0.75rem"
        mb="1rem"
        fontWeight="700"
        _hover={{
          color: theme.colors.black,
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.white,
        }}
        onClick={() => {
          onOpen();
        }}
      >
        EMAIL
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay style={{ backdropFilter: "blur(3px)" }} />
        <ModalContent
          bg="black"
          color="white"
          border="2px solid white"
          borderRadius="2px"
          py="1rem"
        >
          <ModalBody>
            <div className="login-method-grid-item-container">
              <Input
                bg={theme.colors.input}
                w="100%"
                mb="1rem"
                borderRadius="2px"
                border="none"
                fontWeight="500"
                letterSpacing="1px"
                color="white"
                focusBorderColor="white"
                _placeholder={{ color: theme.colors.darkerGray }}
                isDisabled={isLoginInProgress}
                onChange={(e) => {
                  if (emailError) setEmailError(false);
                  setEmail(e.target.value);
                }}
                placeholder={
                  username.length > 0 ? "Already logged in" : "Email address"
                }
                value={email}
                isInvalid={emailError}
                errorBorderColor="red.300"
              />

              {emailError && <span className="error">Enter a valid email</span>}

              <Button
                bg={theme.colors.white}
                color={theme.colors.black}
                borderRadius="2px"
                letterSpacing="1px"
                w="100%"
                isDisabled={
                  isLoginInProgress ||
                  (username.length > 0 ? false : email.length === 0)
                }
                onClick={() => handleLogin()}
                isLoading={isLoginInProgress}
                spinner={
                  <Flex flexDirection="row" align="center">
                    <Spinner color="black" />
                    <Text ml={3}>LOGGING IN</Text>
                  </Flex>
                }
              >
                LOGIN
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmailLoginModal;
