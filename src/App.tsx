import { Route, Routes } from "react-router";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import SolanaWallets from "./pages/SolanaWallets";
import EthereumWallets from "./pages/EthereumWallets";


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solana-wallets" element={<SolanaWallets />} />
        <Route path="/ethereum-wallets" element={<EthereumWallets />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
