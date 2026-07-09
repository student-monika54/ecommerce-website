import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function App() {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    const handlePopState = () => setPathname(getCurrentPath());

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (pathname === '/login') {
    return <Login />;
  }

  return <Home />;
}

export default App;