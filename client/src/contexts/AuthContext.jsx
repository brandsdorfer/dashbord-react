import { createContext , useEffect , useState } from "react";
import axios from "axios"
import { toastFire } from '../utils/index';


const url = "http://localhost:3000/users/manager";
export const AuthContext = createContext();

function AuthProvider({children}){

    const [isDarkMode, setDarkMode] = useState("dark");
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
      };

      async function authManager(){
        try {
        const {data} = await axios.get(`${url}/auth`,{withCredentials:true})
        
        if(!data.success) throw new Error("dont valid token");

        setIsAuth(true)
        
      
      } catch (error) {
          console.log(error)
          setIsAuth(false)
         

        }
      }


      async function login(values) {
        try {
      setIsLoading(true)
       const { data } = await axios.post(`${url}/login`,values,{withCredentials:true});
    
       if(!data.success) throw new Error("dont success to login");
        setIsAuth(true)
        toastFire(true,data.message)

        return true
       
        } catch (error) {
          console.log(error);
          const message = error.response.data.error
          toastFire(false,message)
          return false
        }
        finally{
          setIsLoading(false)
        }
      }

      async function logOut(){
        try {
         const {data} = await axios.get(`${url}/logout`,{withCredentials:true});
        
         if(data.success){
          setIsAuth(false)
         }
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        if (isDarkMode === "dark") {
          document.documentElement.classList.add("dark");
        } else document.documentElement.classList.remove("dark");
      }, [isDarkMode]);


      useEffect(() => {
      authManager();
      },[])
    


      const value = {
        toggleDarkMode,
        isDarkMode,
        setDarkMode,
        login,
        isAuth,
        setIsAuth,
        logOut,
        isLoading
      }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;