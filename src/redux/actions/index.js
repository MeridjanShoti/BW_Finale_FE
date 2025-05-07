

export const fetchLogin = (username, password) => {
let apiUrl = import.meta.env.VITE_API_URL;


    return (dispatch) => {
        fetch ( apiUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username ,
                password: password,
            }),
            
        })
        .then((response) => response.json()   )
        .then((data) => {
            if (data) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: data,
                }); 
                localStorage.setItem("token", data.token);
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: data,
                });
            }
        })

    };
};


export const fetchUserDetails = (token) => {
    return (dispatch) => {
        fetch(apiUrl + "/current-user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                dispatch({
                    type: "SET_USER",
                    payload: data,
                });
            } else {
                dispatch({
                    type: "LOGOUT",
                });
            }
        });
    };
}