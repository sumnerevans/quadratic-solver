var QS = {
    aInput: null,
    bInput: null,
    cInput: null,
    answerTextarea: null,

    setup: function () {
        // Get all of the elements
        aInput = document.getElementById('a');
        bInput = document.getElementById('b');
        cInput = document.getElementById('c');
        answerTextarea = document.getElementById('answer');

        // Load the data from local storage
        if (localStorage.savedAInput) {
            aInput.value = localStorage.savedAInput;
            bInput.value = localStorage.savedBInput;
            cInput.value = localStorage.savedCInput;
            QS.solveEquation();
        }

        // Add event listeners
        aInput.addEventListener('change', QS.solveEquation, false);
        bInput.addEventListener('change', QS.solveEquation, false);
        cInput.addEventListener('change', QS.solveEquation, false);
    },

    solveEquation: function () {
        // Variables for soving the equation
        var answer;
        var bSquared;
        var secondPartOfSqrRt;
        var sqrRt;
        var denominatior;
        var firstPartOfTop;
        var hasI;

        // A, B, and C variables
        var a = aInput.value;
        var b = bInput.value;
        var c = cInput.value;

        // Solve
        bSquared = b * b;
        secondPartOfSqrRt = 4 * a * c;
        sqrRt = bSquared - secondPartOfSqrRt;
        denominatior = 2 * a;
        firstPartOfTop = -b;

        if (secondPartOfSqrRt > bSquared) { //if the result will have an 'i'
            sqrRt = secondPartOfSqrRt - bSquared;
            hasI = 'i';

            //Print in columns put firstPartOfTop and the underline and the first denominatior for the first colom
            //Print the rest in the next column
            answer = firstPartOfTop + "                      √" + sqrRt + "\n" +
                    "____________________ ± ____________________" + hasI + "\n" +
                    +denominatior + "                      " + denominatior;
        } else {
            answer = firstPartOfTop + "±√" + sqrRt + "\n" +
                    "_______________________________________" + "\n" +
                    "  " + denominatior;
        }

        // Print the answer to the screen
        answerTextarea.value = answer;
        console.log(answerTextarea);
    }
}
