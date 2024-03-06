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

const formSchema = z.object({
  toPubKey: z.string().min(60).max(70),
  amount: z.number().min(0.0001).max(1000000),
});

export const Transfer = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toPubKey: "",
      amount: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
            name="toPubKey"
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
    </div>
  );
};
