"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }


  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
  

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(person.length === 0){
    alert("Could not find that individual.");
    return app(people); // restart
  }





  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    displayFamily(person, people)
    break;
    case "descendants":
    displayParents(person, people)
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

   

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // DONE: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByTrait(people){
  let personsTrait = promptFor ("Which trait would you like to search by?\n Enter 1 to search by eye-color.\n Enter 2 to search by height.\n Enter 3 to search by weight.\n Enter 4 to search by gender.\n Enter 5 to search by date of birth.\n", autoValid)
  let searchResults = people;
  switch(personsTrait){
    case "1":
      searchResults = searchByEyeColor(searchResults);
      displayPeople(searchResults);
      break;
  }

}


function searchByEyeColor(people){
  let eyeColor = promptFor ("What is the person's eye color?", autoValid);
  let foundEyeColor = people.filter(function(potentialEyeColorMatch){
    if(potentialEyeColorMatch.eyeColor === eyeColor){
    return true;
  }
  else{
    return false;
  }
})
return foundEyeColor
}

//DONE: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let displayInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
      displayInfo += "ID: " + person.id + "\n";
      displayInfo += "DOB: " + person.dob + "\n";
      displayInfo += "Gender: " + person.gender + "\n";
      displayInfo += "Height: " + person.height + "\n";
      displayInfo += "Weight: " + person.weight + "\n";
      displayInfo += "Eye Color: " + person.eyeColor + "\n";
      displayInfo += "Occupation: " + person.occupation + "\n";
    
  alert(displayInfo);
}

// get persons currentSpouse ID
function displaySpouse(person, people){
let currentSpouse = people.filter(function(currentSpouse){
  if(person[0].currentSpouse === currentSpouse.id){
    return true;
  }
  else{
    return false;
  }
})
alert(person[0].firstName + " " + person[0].lastName + " " + "is married to" + " " + currentSpouse[0].firstName + " " + currentSpouse[0].lastName);
}
// match currentSpouse ID to persons ID
// return persons name
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion