import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAccountService } from "@/domain/hooks/useAccountService";

export const Accounts = () => {
  const { accounts } = useAccountService();
  console.log({ accounts });
  return (
    <div className="w-full">
      <div className=" h-20 w-full">
        <h1 className="text-3xl">Accounts</h1>
      </div>
      <Table>
        <TableCaption>A list of all Accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Public key</TableHead>
            <TableHead>type</TableHead>
            <TableHead className="text-right">balance in $JARJAR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{account.pubkey}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell className="text-right">{account.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
