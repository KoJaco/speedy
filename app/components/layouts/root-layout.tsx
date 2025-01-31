import React from "react";
import { ModeToggle } from "../mode-toggle";
import Container from "../ui/container";
import { Link } from "@remix-run/react";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            <div className="min-h-screen flex flex-col w-full h-full">
                <header className="h-24  flex justify-between items-center px-8">
                    <Link to="/">Logo</Link>
                    <Link
                        to="/leaderboard"
                        className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                        Leaderboard <ArrowRight />
                    </Link>
                </header>
                <main className="mt-24  flex flex-col h-full px-8 flex-1">
                    {children}
                </main>
                <footer className="mt-auto w-full py-16 px-8 flex justify-between items-end">
                    <div className="text-sm">
                        <h3 className="text-semibold capitalize">Site</h3>
                        <ul className="text-foreground/50 mt-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-foreground/75 tracking-wide"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-foreground/75 tracking-wide"
                                >
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <ModeToggle />
                </footer>
            </div>
        </Container>
    );
};

export default RootLayout;
