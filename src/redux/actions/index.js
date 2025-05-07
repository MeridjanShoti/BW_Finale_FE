

export const fetchLogin = (username, password) => {
const apiUrl = import.meta.env.VITE_API_URL;

    return (dispatch) => {
        fetch ( "http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username ,
                password: password,
            }),
            
        })
        .then((response) => {   console.log("Response:", response); 
            return response.json()  } )
        

      
        .then((data) => {
            if (data.access) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: data,
                }); 
                localStorage.setItem("access", data.access);
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: data,
                });
            }
        })

    };
};