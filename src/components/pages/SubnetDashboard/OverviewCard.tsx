import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";

const data = [];

for (let i = 1; i < 24; i++) {
  data.push({
    name: dayjs().subtract(i, "hour").format("HH:mm"),
    total: Math.random() / 10,
  });
}

const recentTxs = [
  {
    price: 1.23,
    date: dayjs().format("ddd, MMM D"),
    txId: "90asd-1234-1234",
  },
  {
    price: 1.23,
    date: dayjs().format("ddd, MMM D"),
    txId: "90asd-1234-1234",
  },
  {
    price: 1.23,
    date: dayjs().format("ddd, MMM D"),
    txId: "90asd-1234-1234",
  },
  {
    price: 1.23,
    date: dayjs().format("ddd, MMM D"),
    txId: "90asd-1234-1234",
  },
  {
    price: 1.23,
    date: dayjs().format("ddd, MMM D"),
    txId: "90asd-1234-1234",
  },
];

console.log({ data });

type OverviewCardProps = {
  title: string;
  inference: number;
};

export const OverviewCard = ({ title, inference }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-left">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="text-left">Recent mine txs</CardTitle>
          <CardDescription className="text-left">
            {inference} inference this week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentTxs.map((tx) => (
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/jarjar.jpg" alt="Avatar" />
                  <AvatarFallback>JJ</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 w-full">
                  <p className="text-sm font-medium leading-none">{tx.txId}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <div className="ml-auto font-medium">{tx.price}$</div>
              </div>
            ))}
          </div>
          {/* <RecentSales /> */}
        </CardContent>
      </Card>
    </div>
  );
};
