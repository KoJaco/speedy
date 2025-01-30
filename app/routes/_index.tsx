import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "ReacclassName=tion" },
        { name: "description", content: "asdf asdfkkasfh askdfasdf" },
    ];
};

export default function Index() {
    // const { toast } = useToast();

    return <div></div>;
}
