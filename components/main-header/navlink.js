'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classes from './navlink.module.css';

const NavLink = ({ href, children }) => {
    const path = usePathname();
    return (
        <Link href={href} className={`${classes.link} ${path.startsWith(href) ? classes.active : ''}`}>{children}</Link>
    );
};

export default NavLink;