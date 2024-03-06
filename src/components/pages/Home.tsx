import { useServices } from "@/domain/core/services";
import { EvervaultCard, Icon } from "../ui/evervault-card";
import { TypewriterEffect } from "../ui/typewriter-effect";
import {
  useCurrentAccount,
  useSignPersonalMessage,
  ConnectButton,
} from "@mysten/dapp-kit";
import { useEffect } from "react";

const words = [
  {
    text: "Discover",
  },
  {
    text: "awesome",
  },
  {
    text: "AI",
  },
  {
    text: "D/APPs",
  },
  {
    text: "build",
  },
  {
    text: "on",
  },
  {
    text: "JarJar.",
    className: "text-jarjar dark:text-jarjar",
  },
];

export const Home = () => {
  const account = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const { userService } = useServices();

  useEffect(() => {
    userService.setUserAccount(account);
    userService.signFn = signPersonalMessage;
  }, [account]);

  return (
    // header
    <div className="w-full">
      <div className="flex justify-between w-full">
        <h1
          className="h-12 text-center text-3xl vertical-center items-center flex"
          style={{ fontFamily: "PublicPixel" }}
        >
          JARJAR D/APP
        </h1>
        <ConnectButton></ConnectButton>
      </div>
      {/* CENTER */}
      <div className="flex flex-col items-center justify-center h-[30rem] ">
        <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
          The road to decentralized AI starts from here
        </p>
        <TypewriterEffect words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <ConnectButton></ConnectButton>
        </div>
      </div>
      <div className="xl:flex">
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="JARJAR CHAT" />

          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            Take advantage of all LLM running on the protocol with a chatgpt
            like interface
          </h2>
          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Comming soon
          </p>
        </div>

        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="JARJAR IMG" />

          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            Take advantage of all AI Image gen running on the protocol with a
            text to img interface
          </h2>
          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Comming soon
          </p>
        </div>

        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="JARJAR VOCAL" />

          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            Multiple AI Model used at once, to create a vocal interface to AI
          </h2>
          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Comming soon
          </p>
        </div>
      </div>
    </div>
  );
};
