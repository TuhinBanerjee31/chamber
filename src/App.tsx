import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import CustomHeader from "./custom/CustomHeader";
import CustomFooter from "./custom/CustomFooter";
import CustomBody from "./custom/CustomBody";


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="font-mulish">
        <CustomHeader />
        <CustomBody />
        <CustomFooter />
      </div>
    </ThemeProvider>
  );
}

export default App;
