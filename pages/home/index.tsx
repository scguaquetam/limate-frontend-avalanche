import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Center, Grid, Text } from "@chakra-ui/react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";

import { Happ3nEvent } from "../../src/models/Event";
import FeaturedEvent from "../../components/cards/FeaturedEvent";
import { PrivateGet, PublicFetch, PublicPost } from "../../src/utils/DataManagement";
import { useUser } from "../../context/userContext";
import ProfileCard from "../../components/home/ProfileCard";
import BadgesSection from "../../components/home/BadgesSection";
import { SiweMessage } from "siwe";

const Home = () => {
  const { isConnected, address, chainId } = useAccount();
  const { user, setUser } = useUser();
  const [featuredEvents, setFeaturedEvents] = useState<Happ3nEvent[] | null>(
    null
  );
  const [selectedButton, setSelectedButton] = useState("explore");
  // const [nonce, setNonce] = useState<string | null>(null);
  const [getToken, setGetToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { signMessage } = useSignMessage();
  let nonceRequested = false;
  //Login check /////////////////////////////
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (!isConnected) return;
      const token = localStorage.getItem("token");
      console.log('token', token);
      if (!token || token === undefined) {
        getNonce();
      } else {
        verifyToken();
      }
  }, [isConnected]);


  const getNonce = async () => {
    try {
      console.log("getNonce");
      if(nonceRequested) return;
      const response = await PublicPost("/auth/request-nonce", {
        address: address,
      });
      nonceRequested = true;
      if(!response?.nonce) {
        toast.error(
          "An error occurred while trying to login. Please try again later."
        );
        return;
      }
      console.log("response nonce is", response);
      const message = new SiweMessage({
        domain: document.location.host,
        address: address,
        chainId: chainId,
        uri: document.location.origin,
        version: '1',
        statement: 'Sign this to log in at Limate',
        nonce: response.nonce,
      });
      console.log('prev to sign message');
      console.log('message is', message);
      signMessage(
        { message: message.prepareMessage() },
        {
          onSuccess: async (signature) => {
            console.log('signature is', signature);
            loginUser(signature, message, response.nonce);
          },
          onError: (error) => {
            console.log('error on sign message', error);
            toast.error(
              "An error occurred while trying to login. Please try again later."
            );
          },
        }
      );
    } catch (error) {
      toast.error(
        "An error occurred while trying to login. Please tsry again later."
      );
    }
  };
  const verifyToken = async () => {
    try {
      const response = await PrivateGet("/auth/auto-login-user");
      setUser({
        isLogged: true,
        token: response.token,
        user: response.user,
      });
      toast.success("You have been logged in successfully.");
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      // getNonce();
      toast.error(
        "An error occurred while trying to login. Please try again later."
      );
    }
  };
  const loginUser = async (signature: string, message: SiweMessage, nonce: string) => {
    try {
      const body = {
        address: address,
        nonce: nonce,
        signature,
        message
      };
      console.log('nonce is', nonce);
      console.log('body in login request is', body);
      const response = await PublicPost("/auth/login-user", body);
      console.log('response login is', response);
      
      localStorage.setItem("token", response.token);
      setUser({
        isLogged: true,
        token: response.token,
        user: response.user,
      });
      setGetToken(!getToken);
      toast.success("You have been logged in successfully.");
      setLoading(false);
    } catch (error) {
      toast.error(
        "An error occurred while trying to login. Please try again later."
      );
    }
  };
  //Login check /////////////////////////////

  const onClickEvent = (id: string) => {
    const url = `/detail?id=${id}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (newWindow) {
      newWindow.opener = null;
    }
  };

  if(loading) {
    return (
      <Box mt={"70px"} w={"100%"} h={"700px"}>
          <Center>
          <Text>Loading...</Text>
      </Center>
        </Box>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>My Mates - By Happ3n</title>
        <meta name="Limates by happ3n" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box mt={"70px"} w={"100%"} h={"700px"}>
        {user && <ProfileCard 
          user={user}
        />}
        <BadgesSection />
      </Box>
      <Text fontSize="18px" textAlign="center" mt={2} mb={10} color={"#666666"}>
        By Happ3n
      </Text>
    </Fragment>
  );
};

export default Home;
