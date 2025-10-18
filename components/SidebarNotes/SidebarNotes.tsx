'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const SidebarNotes = () => {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Filter by tag</h2>
      <ul className={css.menuList}>
        {TAGS.map((tag) => {
          const href = `/notes/filter/${tag}`;
          const isActive = pathname === href;

          return (
            <li
              key={tag}
              className={css.menuItem}
            >
              <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.active : ''}`}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarNotes;
