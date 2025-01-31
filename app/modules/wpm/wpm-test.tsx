import { useState, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { SENTENCES } from "~/lib/constants";
import { cn } from "~/lib/utils";

const getRandomSentence = (difficulty: keyof typeof SENTENCES) => {
    const sentences = SENTENCES[difficulty];
    return sentences[Math.floor(Math.random() * sentences.length)];
};

type Difficulty = "beginner" | "intermediate" | "advanced";

const buttons: Difficulty[] = ["beginner", "intermediate", "advanced"];

export default function WPMTest() {
    const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
    const [sentence, setSentence] = useState<string>(
        getRandomSentence(difficulty)
    );
    const [typedText, setTypedText] = useState<string>("");
    const [testState, setTestState] = useState<"idle" | "green" | "red">(
        "idle"
    );
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;

        if (testState === "idle") {
            // Start the test on first keystroke
            setTestState("green");
            setStartTime(performance.now());
        }

        if (testState === "green") {
            if (startTime && !reactionTime) {
                setReactionTime(performance.now() - startTime);
            }
            setTypedText(newText);

            if (newText === sentence) {
                const elapsedTime = (performance.now() - startTime!) / 60000; // Convert to minutes
                setWpm(sentence.split(" ").length / elapsedTime);
                setTestState("idle");
            }
        }
    };

    useEffect(() => {
        setSentence(getRandomSentence(difficulty));
        setTypedText("");
        setTestState("idle");
        setReactionTime(null);
        setWpm(null);
    }, [difficulty]);

    return (
        <Card className="p-6 w-full min-h-[600px] flex flex-col">
            <CardContent>
                <p className="text-lg font-bold mb-4">
                    {sentence.split("").map((char, index) => {
                        const isTyped = index < typedText.length;
                        return (
                            <span
                                key={index}
                                className={cn(
                                    "transition-all",
                                    isTyped
                                        ? "text-black"
                                        : "text-gray-400 opacity-50"
                                )}
                            >
                                {char}
                            </span>
                        );
                    })}
                </p>

                <input
                    ref={inputRef}
                    type="text"
                    className="w-full p-2 border rounded bg-transparent focus:outline-none text-lg tracking-wide"
                    value={typedText}
                    onChange={handleInputChange}
                    autoFocus
                />
            </CardContent>

            {reactionTime !== null && (
                <p className="mt-4">
                    Reaction Time: {reactionTime.toFixed(2)} ms
                </p>
            )}
            {wpm !== null && <p className="mt-2">WPM: {wpm.toFixed(1)}</p>}

            <CardFooter className="mt-auto flex gap-x-4">
                {buttons.map((btn, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className={cn(
                            "capitalize",
                            difficulty === btn
                                ? "bg-foreground text-background disabled:opacity-100 disabled:cursor-not-allowed"
                                : ""
                        )}
                        disabled={difficulty === btn}
                        onClick={() => setDifficulty(btn)}
                    >
                        {btn}
                    </Button>
                ))}
            </CardFooter>
        </Card>
    );
}
