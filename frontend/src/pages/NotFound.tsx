
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // If trying to access removed admin-login route, redirect to home
    if (location.pathname === "/admin-login") {
      toast.error("Ադմինիստրատորի մուտքի էջը այլևս հասանելի չէ։");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Ուպս! Էջը չի գտնվել</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors inline-block"
        >
          Վերադառնալ Գլխավոր էջ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
