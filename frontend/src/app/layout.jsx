import "../styles/globals.css"; // Глобальные стили
import { Inter } from "next/font/google";
import ClientProvider from "./context/ClientProvider";
const inter = Inter({ subsets: ["latin"] });
import '@ant-design/v5-patch-for-react-19';

export const metadata = {
  title: "Ветеринарная клиника",
  description: "Система управления ветеринарной клиникой"
};

export default  function RootLayout({ children }) {
  
  return (

    <html lang="ru">
      <body className={`mx-auto my-0`}>
        <ClientProvider>{children}</ClientProvider>
      </body>

    </html>
  );
}
