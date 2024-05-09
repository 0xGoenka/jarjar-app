import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { useUserService } from "@/domain/hooks/useUserService";
import { Link } from "react-router-dom";
import { Button } from "./button";

export const JarJarMenu = () => {
  const { account } = useUserService();

  return (
    <Menubar>
      <h2 className="hidden md:block ml-2 text-lg font-semibold tracking-tight text-left w-[250px]">
        JarJar D/App
      </h2>
      <MenubarMenu>
        {/* <Link to="/appstore">
          <Button variant="ghost">App Store</Button>
        </Link> */}
        <Link to="/chat">
          <Button variant="ghost">Chat</Button>
        </Link>
        <Link to="/transfer">
          <Button variant="ghost">Transfer</Button>
        </Link>
        <Link to="/transactions">
          <Button variant="ghost">Transactions</Button>
        </Link>
      </MenubarMenu>
      <div className="hidden md:block text-right w-full pr-2">
        {account?.balance} $JARJAR
      </div>
    </Menubar>
  );
};
