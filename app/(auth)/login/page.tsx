import LoginComponent from "./Login";

export const metadata = {
    title: "Login",
    description: "Login to your account",
    keywords: ["login", "authentication", "sign in"]
};  
export default function Login() {
    return (
        <div>
            <LoginComponent/>
        </div>
    );
}