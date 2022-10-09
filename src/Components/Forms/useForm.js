import {useState} from "react";
import axios from "axios";

export const useForm = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (event, data) => {

        event.preventDefault();

        setError(null);

        axios.post(event.target.action, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(response => {
            if (response.status === 201 || response.status === 200) {
                // this.setState({successfulResponse: response.data})
                setResponse(response.data);
            }
            console.log(response);
        }).catch(err => {
            if (err.response.status === 422 || err.response.status === 400) {
                setError(err.response.data.violations)
                console.log(this.state);
            }
        })
    }

    return {handleSubmit, response, error};
};
