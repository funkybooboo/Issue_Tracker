'use client';

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import {usePathname} from "next/navigation";
import classnames from "classnames";

interface Links {
    label: string;
    href: string;
}

const NavBar = () => {

    const currentPath = usePathname();

    const links: Links[] = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];
    return (
        <nav className={"flex space-x-6 border-b mb-5 px-5 h-14 items-center"}>
            <Link href={"/"}><FaBug/></Link>
            <ul className={"flex space-x-6"}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        className={classnames({
                            "text-zinc-900": currentPath === link.href,
                            "text-zinc-500": currentPath !== link.href,
                            "hover:text-zinc-800 transition-colors": true,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;