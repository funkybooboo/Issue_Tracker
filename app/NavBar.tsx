'use client';

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import {usePathname} from "next/navigation";
import classnames from "classnames";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, Flex, Text} from "@radix-ui/themes";
import {DropdownMenu} from "@radix-ui/themes";

interface Links {
    label: string;
    href: string;
}

const NavBar = () => {

    const currentPath = usePathname();
    const {status, data: session} = useSession();

    const links: Links[] = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];
    return (
        <nav className={"border-b mb-5 px-5 py-3"}>
            <Container>
                <Flex justify={"between"}>
                    <Flex align={"center"} gap={"3"}>
                        <Link href={"/"}><FaBug/></Link>
                        <ul className={"flex space-x-6"}>
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        className={classnames({
                                            "text-zinc-900": currentPath === link.href,
                                            "text-zinc-500": currentPath !== link.href,
                                            "hover:text-zinc-800 transition-colors": true,
                                        })}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        { status === "authenticated" &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        src={session.user!.image!}
                                        fallback={"?"}
                                        size={"2"}
                                        radius={"full"}
                                        className={"cursor-pointer"}
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size={"2"}>
                                            {session.user!.email!}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href={"/api/auth/signout"}>Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        { status === "unauthenticated" && <Link href={"/api/auth/signin"}>Log in</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
}

export default NavBar;