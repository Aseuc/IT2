const databaseURI = "http://217.83.108.206:5984/";

async function requestDatabase(method, path, body = {}) {
  let response;
  if (method === "GET" || method === "HEAD") {
    response = await fetch(databaseURI + path, {
      method: method,
      credentials: "include"
    });
  } else {
    response = await fetch(databaseURI + path, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
  }
  const message = await response.json();
  return {
    response: response,
    message: message
  };
}

async function login(user, pass) {
  if (!user || !pass || user === "" || pass === "")
    return new Error("No credentials provided");
  const credentials = {
    name: user,
    password: pass
  };
  let result;
  try {
    result = await requestDatabase("POST", "_session", credentials);
  } catch (e) {
    return new Error(e.message);
  }
  console.log(result);
  return result;
}
/* 
async function login1() {
  login("kit", "kat");
  console.log(getUser())
} */

async function getUser() {
  const result = await requestDatabase("GET", "_session");
  if (!result.message.hasOwnProperty("userCtx")) return null;
  return result.message.userCtx.name;
}

async function logout() {
  await requestDatabase("DELETE", "_session");
  location.href = "../../";
}

/* async function request() {
  alert(requestDatabase("GET", "userdata//_all_docs?include_docs=true", ""));
}
 */

/* async function putUserData() {
    getIDs = await requestDatabase(
        "GET",
        "userdata/_all_docs?include_docs=true"
      );
    array = getIDs.message.rows;
    cursor = 0
    if(array.length <= 0) {
    cursor = 1111111111
    }else{
    
    cursor = array[array.length - 1].doc.cursor;
    cursor++
    }

    var json = {
        _id: `${cursor}`,
        cursor: `${cursor}`,
        reputationSupervisor: `${"hi"}`,
        lastnameSupervisor: `${"hi"}`,
        firstnameSupervisor: `${"hi"}`,
        supervisorEmail: `${"hi"}` + "@fau.de",
        departmentSupervisor: `${"jo"}`,
        permissionSupervisor: `${"k"}`,
      };

      await requestDatabase("PUT", "userdata/" + cursor, json);
  } */
/* 
  async function getUserData(){
    getIDs = await requestDatabase(
        "GET",
        "userdata/_all_docs?include_docs=true"
      );

console.log(getIDs.message.rows);
      return getIDs;
  }


  getUserData(); */
