   export const checkValidData = (fname, lname, email, passwordLogin) => {
    const nameRegex = /^[A-Za-zÀ-ÿ]+([- '][A-Za-zÀ-ÿ]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =  /^.{6,}$/;
  
    const isFirstValid = nameRegex.test(fname);
    const isLastValid = nameRegex.test(lname);
    const isEmailValid = emailRegex.test(email);
    // const isPasswordValid = passwordRegex.test(password);
    const isPasswordLoginValid = passwordRegex.test(passwordLogin);
  
    if (!isFirstValid) return "First Name is not valid";
    if (!isLastValid) return "Last Name is not valid";
    if (!isEmailValid) return "Email ID is not valid";
    // if (!isPasswordValid) return "Password is not valid";
    if (!isPasswordLoginValid) return "Password for login is not valid";
  
    return null;
  };