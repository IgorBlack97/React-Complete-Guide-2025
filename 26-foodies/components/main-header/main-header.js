import Link from "next/link";
import logoImg from "@/assets/logo.png"
import styles from "./main-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link";

export default function Header() {


    return <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <Image src={logoImg} alt="A plate with food." priority/>
        </Link>

        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink href="/meals">Browse Meals</NavLink>
                </li>
                <li>
                    <NavLink href="/community">Foodies Community</NavLink>
                </li>
            </ul>
        </nav>
    </header>
}