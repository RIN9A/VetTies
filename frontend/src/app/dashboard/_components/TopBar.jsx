'use client';
import { usePathname } from 'next/navigation';
import { useDashboardContext } from '../_util/Provider';
import { data } from '../_util/data';

export function TopBar() {
  const { openSidebar } = useDashboardContext();
  const pathname = usePathname();
  const currentItem = data.find(item => pathname.startsWith(item.link));

  const title = currentItem?.title || '';
  return (
      <header className="relative z-10 px-8 pt-8 ">
        <h1 className="text-3xl font-semibold text-[#240066]">{title}</h1>
      </header>

  );
}