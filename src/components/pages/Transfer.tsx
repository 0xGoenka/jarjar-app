import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useServices } from "@/domain/core/services";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatKey } from "@/domain/utils/formatKey";
import dayjs from "dayjs";
import { useTransactionService } from "@/domain/hooks/useTransactionService";
import { useEffect } from "react";

const formSchema = z.object({
  to: z.string().min(60).max(70),
  amount: z.coerce.number().min(0.0001).max(1000000),
});

export const Transfer = () => {
  const { transactionService, userService } = useServices();

  const { user_ledger_txs } = useTransactionService();

  useEffect(() => {
    const intervalId = setInterval(() => {
      transactionService.fetchUserLedgerTxs();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      amount: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    transactionService.pay(values);
    setTimeout(() => {
      userService.fetchAccount();
    }, 1000);
    console.log(values);
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" h-20 w-full">
        <h1 className="text-3xl">Transfer</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-96 border self-center p-8"
        >
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Public key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x5593f67a0a3fb9665fb019e42e6708da63938411ba0397ce857deadcf16ffdd5"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address you want to send $JarJar to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormDescription>
                  How many $JarJar you want to send
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
      <TooltipProvider>
        <div className="w-full">
          <div className=" h-20 w-full">
            <h1 className="text-3xl">Transactions history</h1>
          </div>
          <Table>
            <TableCaption>A list of recent user Txs. (max 10)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">TxId</TableHead>
                <TableHead className="w-[100px]">From</TableHead>
                <TableHead className="w-[100px]">To</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[60px]">Type</TableHead>
                <TableHead className="w-[150px]">UTC time</TableHead>
                <TableHead className="text-right">Amount in $JARJAR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user_ledger_txs.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Tooltip>
                      <TooltipTrigger>
                        {formatKey(tx.txId).formatedKey}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tx.txId}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Tooltip>
                      <TooltipTrigger>
                        {formatKey(tx.from).formatedKey}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tx.from}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Tooltip>
                      <TooltipTrigger>
                        {formatKey(tx.to).formatedKey}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tx.to}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>
                    {dayjs(tx.timestamp).format("DD/MM/YY HH:mm:ss")}
                  </TableCell>
                  <TableCell className="text-right">{tx.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>
    </div>
  );
};
