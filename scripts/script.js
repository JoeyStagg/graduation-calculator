//This is used to figure out which semester youre in based on the month
function semester(month) {
    var currentMonth = "Spring";
    if (month >= 1 && month <= 4) {
        currentMonth = "Spring";
    } else if (month >= 5 && month <= 8) {
        currentMonth = "Summer";
    } else if (month >= 9 && month <= 12) {
        currentMonth = "Fall";
    }
    return currentMonth;
}


function calculations() {
    //These are the values the user inputs into the website
    var creditsLeft = document.getElementById("credits-left").value;
    var creditsPerSemester = document.getElementById("credits-per-semester").value;

    //Calculates how many semesters are left
    var numSemesters = parseInt(creditsLeft / creditsPerSemester);
    if (creditsLeft % creditsPerSemester != 0) { //This adds a semester if there are remaining credits less than creditsPerSemester
        numSemesters++;
    }

    //Determines if the user wants to take summer semesters
    var summerAnswerYes = document.getElementById("yes").checked;
    var summerClass = false;
    if (summerAnswerYes == true) {
        summerClass = true;
    }

    //Gets current month for semester calculation
    const currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var finishYear = currentYear;
    var finishMonth = currentMonth;
    var firstNextSemester = semester(currentMonth);

    //Looks at if youre taking summers and calculates the semester that you are going to end in accordingly
    if (summerClass) {
        for (var i = 1; i <= numSemesters; i++) {
            finishMonth = finishMonth + 4;
            if (finishMonth > 12) {
                finishMonth -= 12;
                finishYear++;
            }
        }
    } else {
        if (firstNextSemester == "Fall") {
            for (var i = 0; i < numSemesters; i++) {
                if (i % 2 == 0) {
                    finishMonth = finishMonth + 4;
                } else {
                    finishMonth = finishMonth + 8;
                }
                if (finishMonth > 12) {
                    finishMonth -= 12;
                    finishYear++;
                }
            }
        } else {
            if (firstNextSemester == "Spring") {
                for (var i = 0; i < numSemesters; i++) {
                    if (i % 2 == 0) {
                        finishMonth = finishMonth + 8;
                    } else {
                        finishMonth = finishMonth + 4;
                    }
                    if (finishMonth > 12) {
                        finishMonth -= 12;
                        finishYear++;
                    }
                }
            }
        }
    }

    //Prints result of calculations
    var season = semester(finishMonth);
    var outputString = "You will finish in " + numSemesters + " semester(s) in ";
    var lastString = season + " " + finishYear
    console.log(outputString);
    console.log(summerClass);
    document.getElementById("show-output").innerHTML = outputString;
    document.getElementById("second-output").innerHTML = lastString;
}




