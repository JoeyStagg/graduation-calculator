<--code by Joey Stagg -->

//This is used to figure out which semester is the next semester based on the month
function nextSemester(month, summer) {
    var semesters = ["Spring", "Summer", "Fall"];
    var nextMonth;
    if (month > 12) {
        month -= 12;
    }
    if (summer) {
        if (month >= 1 && month <= 4) {
            nextMonth = semesters[1];
        } else if (month >= 5 && month <= 8) {
            nextMonth = semesters[2];
        } else if (month >= 9 && month <= 12) {
            nextMonth = semesters[0];
        }
    } else {
        if (month >= 1 && month <= 8) {
            nextMonth = semesters[2];
        } else if (month >= 9 && month <= 12) {
            nextMonth = semesters[0];
        }
    }
    return nextMonth;
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
    var summerClass = false;
    if (document.getElementById("yes").checked) {
        summerClass = true;
    }

    //Gets current month for semester calculation
    const currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var finishYear = currentYear;
    var finishMonth = currentMonth;

    //Looks at if youre taking summers and calculates your last semester accordingly
    if (summerClass) {
        for (var i = 0; i < numSemesters; i++) {
            finishMonth += 4;
            if (finishMonth > 12) {
                finishMonth -= 12;
                finishYear++;
            }
        }
    } else {
        if (nextSemester(finishMonth, summerClass) == "Fall") {
            for (var i = 0; i < numSemesters; i++) {
                if (nextSemester(finishMonth, summerClass) == "Fall") {
                    finishMonth += 4;
                    if (finishMonth > 12) {
                        finishMonth -= 12;
                        finishYear++;
                    }
                } else if (nextSemester(finishMonth, summerClass) == "Spring") {
                    finishMonth += 8;
                    if (finishMonth > 12) {
                        finishMonth -= 12;
                        finishYear++;
                    }
                }
            }
        }
    }

    //Prints result of calculations
    var season = nextSemester(finishMonth + 4);
    var outputString = "You will finish in " + numSemesters + " semester(s) in ";
    var lastString = season + " " + finishYear
    document.getElementById("show-output").innerHTML = outputString;
    document.getElementById("second-output").innerHTML = lastString;
}


