import type { MetaFunction } from "@remix-run/node";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ClickTest from "~/modules/reaction/click-test";
import WPMTest from "~/modules/wpm/wpm-test";

export const meta: MetaFunction = () => {
    return [
        { title: "ReacclassName=tion" },
        { name: "description", content: "asdf asdfkkasfh askdfasdf" },
    ];
};

export default function Index() {
    return (
        <Tabs defaultValue="click" className="w-full h-full">
            <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="click">Click & Hold</TabsTrigger>
                <TabsTrigger value="wpm">Words Per Minute</TabsTrigger>
            </TabsList>
            <TabsContent value="click" className="w-full">
                <ClickTest />
                <div className="mt-8">Description</div>
            </TabsContent>
            <TabsContent value="wpm">
                <WPMTest />
                <div className="mt-8">Description</div>
            </TabsContent>
        </Tabs>
    );
}
