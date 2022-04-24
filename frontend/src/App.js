import NavbarCompt from "./components/Navbar/NavbarCompt/NavbarCompt";
import Admin from "./components/Navbar/pages/admin/admin";
function App() {
  const role =JSON.parse(window.localStorage.getItem("role"))
  return (
    <div>
     {role!=="admin" &&  <NavbarCompt />}
      {role==="admin" && <Admin/>}
    </div>
  );
}

export default App;
