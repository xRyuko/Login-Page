import react, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Signup(){

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    function handleChange(event){

        setAccount((prevValue) => {
            return {
                ...prevValue,
                [event.target.name]: [event.target.value] 
            };
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        if (account.password !== ""){
            axios.post("http://localhost:8000/signup", account)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err));  
        } else {
            setError("Password cannot be empty");
        } 
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" name="email" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" name="password" onChange={handleChange}/>
                {error && <span style={{color:"red"}}>{error}</span>}
            </div>
            <button type="submit">Sign up</button>
            <Link to="/">Log in</Link>
        </form>
    );
}

export default Signup