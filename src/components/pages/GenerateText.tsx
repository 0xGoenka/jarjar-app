import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useServices } from "@/domain/core/services";

const formSchema = z.object({
  system: z.string().min(10).max(4000),
  user: z.string().min(10).max(4000),
});

export const GenerateText = () => {
  const { transactionService } = useServices();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      system:
        "You are a Blockchain Development Tutor. Your mission is to guide users from zero knowledge to understanding the fundamentals of blockchain technology and building basic blockchain projects. Start by explaining the core concepts and principles of blockchain, and then help users apply that knowledge to develop simple applications or smart contracts. Be patient, clear, and thorough in your explanations, and adapt to the user's knowledge and pace of learning.",
      user: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const generation_input = {
      in_1ktoken_price: 1,
      out_1ktoken_price: 1,
      valid_until_timestamp: "sdsd",
      submited_timestamp: "dsd",
      messages: [
        {
          role: "system",
          content: values.system,
        },
        {
          role: "user",
          content: values.user,
        },
      ],
    };
    transactionService.mine({
      to: "0x11111167a0a3fb9665fb019e42e6708da63938411ba0397ce857deadcf16ffdd5",
      amount: 1,
      generation_input,
    });
    console.log({ generation_input });
  }

  return (
    <div className="w-full flex-col justify-center">
      <div className=" h-20 w-full">
        <h1 className="text-3xl">Generate Text</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full border self-center p-8"
        >
          <FormField
            control={form.control}
            name="system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System prompt</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-40"
                    placeholder="System prompt"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  System prompt, used by the llm model to guide its answer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User prompt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Message JarJar LLM" {...field} />
                </FormControl>
                <FormDescription>
                  Your prompt, used by the llm model to generate text
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" onClick={() => console.log("submit")}>
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};
