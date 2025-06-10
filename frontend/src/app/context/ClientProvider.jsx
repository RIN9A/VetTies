"use client"
import { SessionProvider } from 'next-auth/react';
import { NotificationProvider } from './notification/NotificationContext';
import NotificationBanner from './notification/NotificationBanner';


export default function ClientProvider({ children, session }) {
  return <SessionProvider session={session}>
    <NotificationProvider>
      <NotificationBanner />
      {children}
    </NotificationProvider>
  </SessionProvider>
}
