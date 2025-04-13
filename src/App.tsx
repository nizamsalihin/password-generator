import Card from "./Card";
import Container from "./Container";
import "./style.css";

import copyIcon from "$icons/copy.webp";
import rightArrow from "$icons/right-arrow.webp";

import Icon from "./Icon";
import Slider from "./Slider";
import { useEffect, useRef, useState } from "react";
import TaskWrapper from "./TaskWrapper";
import Task from "./Task";
import Button from "./Button";

const MINIMAL_CHARACTER_LENGTH = 8; // setup in env ?
const MAXIMAL_CHARACTER_LENGTH = 50;

interface PasswordConfig {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    symbol: boolean;
    length: number;
}

function App() {
    const [password, setPassword] = useState<string>("");
    const [passwordConfig, setPasswordConfig] = useState<PasswordConfig>({
        uppercase: true,
        lowercase: false,
        number: false,
        symbol: false,
        length: MINIMAL_CHARACTER_LENGTH,
    });

    const generatePassword = () => {
        let password = "";

        let characters = "";
        if (passwordConfig.uppercase) {
            characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        if (passwordConfig.lowercase) {
            characters += "abcdefghijklmnopqrstuvwxyz";
        }

        if (passwordConfig.number) {
            characters += "0123456789";
        }

        if (passwordConfig.symbol) {
            characters += "!@#$%^&*()_+";
        }

        for (let i = 0; i < passwordConfig.length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setPassword(password);
    };

    const getLevel = () => {
        // count how many true characters
        return Object.values(passwordConfig).filter((value) => {
            if (typeof value === "boolean") {
                return value;
            } else {
                return value >= 12;
            }
        }).length;
    };

    const getStrengthLabel = () => {
        // count how many true characters
        const labels = ["", "Feeble", "Wimpy", "Decent", "Mighty", "Unbreakable!!!"];
        let count = getLevel();

        return labels[count];
    };

    useEffect(() => {
        generatePassword();
    }, []);

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <Container>
                <p className="text-md text-gray text-center p-2">Password Generator</p>

                <div className="flex flex-col gap-3 text-white">
                    <Card className="grid grid-cols-[1fr_auto] items-center gap-4 min-h-16">
                        <span className="text-2xl text-white break-all w-full">{password}</span>
                        <Icon url={copyIcon} />
                    </Card>

                    <Card className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <span>Character Length</span>
                            <span className="text-3xl text-primary">{passwordConfig.length}</span>
                        </div>

                        <Slider
                            min={MINIMAL_CHARACTER_LENGTH}
                            max={MAXIMAL_CHARACTER_LENGTH}
                            onSlide={(value) => {
                                setPasswordConfig((currentPasswordConfig) => {
                                    return {
                                        ...currentPasswordConfig,
                                        length: value,
                                    };
                                });
                            }}
                        />

                        <TaskWrapper>
                            <Task
                                label="Include Uppercase Letters"
                                isActive={passwordConfig.uppercase}
                                onChange={(isChecked) => {
                                    setPasswordConfig((currentPasswordConfig) => {
                                        return {
                                            ...currentPasswordConfig,
                                            uppercase: isChecked,
                                        };
                                    });
                                }}
                            />
                            <Task
                                label="Include Lowercase Letters"
                                isActive={passwordConfig.lowercase}
                                onChange={(isChecked) => {
                                    setPasswordConfig((currentPasswordConfig) => {
                                        return {
                                            ...currentPasswordConfig,
                                            lowercase: isChecked,
                                        };
                                    });
                                }}
                            />
                            <Task
                                label="Include Numbers Letters"
                                isActive={passwordConfig.number}
                                onChange={(isChecked) => {
                                    setPasswordConfig({
                                        ...passwordConfig,
                                        number: isChecked,
                                    });
                                }}
                            />
                            <Task
                                label="Include Include Symbols Letters"
                                isActive={passwordConfig.symbol}
                                onChange={(isChecked) => {
                                    setPasswordConfig((currentPasswordConfig) => {
                                        return {
                                            ...currentPasswordConfig,
                                            symbol: isChecked,
                                        };
                                    });
                                }}
                            />
                        </TaskWrapper>

                        {/* TODO: strength bar */}
                        <div className="bg-black flex justify-between items-center gap-2 p-4 min-h-16">
                            <span className="text-gray text-sm">STRENGTH</span>
                            <div className="flex gap-3 items-center">
                                <span className="text-md">{getStrengthLabel()}</span>

                                <div className="flex gap-1.5 h-5">
                                    {Array.from({ length: getLevel() }).map((_, i) => (
                                        <div className="w-2 h-full bg-secondary" key={`strength-active-${i}}`}></div>
                                    ))}
                                    {Array.from({ length: Object.keys(passwordConfig).length - getLevel() }).map(
                                        (_, i) => (
                                            <div
                                                className="w-2 h-full border-[1px]"
                                                key={`strength-inactive-${i}}`}
                                            ></div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button className="flex justify-center items-center gap-2" onClick={generatePassword}>
                            <span>Re-Generate</span>
                            <Icon url={rightArrow} size="small" />
                        </Button>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default App;
