export function validatePassword(password: string) {
  // Define the criteria for a valid password
  const minLength = 8;
  const minUpperCase = 1;
  const minLowerCase = 1;
  const minNumbers = 1;
  const minSpecialChars = 1;
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Check if the password meets the criteria
  if (!password) {
    return { valid: false, error: "Password is required." };
  }
  //   check for password length

  if (password.length < minLength) {
    return {
      valid: false,
      error: `Password must be at least ${minLength} characters long.`,
    };
  }
  //   check for uppercase
  const uppercaseMatch = password.match(/[A-Z]/g);
  if (!uppercaseMatch || uppercaseMatch.length < minUpperCase) {
    return {
      valid: false,
      error: `Password must contain at least ${minUpperCase} uppercase letter(s).`,
    };
  }
  //   check for lowercase
  const lowercaseMatch = password.match(/[a-z]/g);
  if (!lowercaseMatch || lowercaseMatch.length < minLowerCase) {
    return {
      valid: false,
      error: `Password must contain at least ${minLowerCase} lowercase letter(s).`,
    };
  }
  //   check for number
  const minNumbers_regex = password.match(/[0-9]/g);
  if (!minNumbers_regex || minNumbers_regex.length < minNumbers) {
    return {
      valid: false,
      error: `Password must contain at least ${minNumbers} number(s).`,
    };
  }
  //   check for special character
  const specialCharsRegexMatch = password.match(specialCharsRegex);
  if (
    !specialCharsRegexMatch ||
    specialCharsRegexMatch.length < minSpecialChars
  ) {
    return {
      valid: false,
      error: `Password must contain at least ${minSpecialChars} special character(s).`,
    };
  }
  return {
    valid: true,
  };
}
