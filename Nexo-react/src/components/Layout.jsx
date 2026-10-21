import Header from './Header';
import Footer from './Footer';
import ToastNotification from './ToastNotification';

export default function Layout({ children, showFooter = true }) {
  return (
    <>
      <Header />
      <ToastNotification />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
