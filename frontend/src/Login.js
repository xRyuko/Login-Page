import react, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login(){

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    function handleChange(event){
        const {name, value} = event.target;

        setAccount((prevValue) => {
            return {
              ...prevValue,
            [name]: value  
            };
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        if (account.password !== ""){
            axios.post("http://localhost:8000/login", account)
            .then(res => {
                if(res.data === "Success"){
                    navigate("/home");
                } else {
                    alert("Wrong email or password.");
                }
            })
            .catch(err => console.log(err)); 
        } else {
            setError("Password cannot be empty");
        } 
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" name="email" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" name="password" onChange={handleChange}/>
                {error && <span style={{color:"red"}}>{error}</span>}
            </div>
            <button type="submit">Log in</button>
            <Link to="/signup">Create an account</Link>
        </form>
    );
}

export default Login