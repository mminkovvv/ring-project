function getUserData(){
    return JSON.parse(sessionStorage.getItem("userData"))
}

function setUserData(userData){
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function getUserID() {
    const userData = getUserData();
    if(userData){
        return userData._id
    }
    return false;
}
function removeUserData(){
    sessionStorage.removeItem("userData");
}
export const userHelper = {
    getUserData,
    setUserData,
    getUserID,
    removeUserData
}