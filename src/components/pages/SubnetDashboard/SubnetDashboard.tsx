import { Button } from "@/components/ui/button";
import { OverviewCard } from "./OverviewCard";
import { TopCard } from "./TopCard";

export const SubnetDashboard = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-left text-2xl mb-[8px]">JarJarGpt3.5 Subnet</h1>
        <Button variant="default">Set as default</Button>
      </div>
      <TopCard />
      <OverviewCard
        title="Average inference price / 1k token"
        inference={153}
      />
    </div>
  );
};
