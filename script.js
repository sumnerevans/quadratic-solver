var QS = {
    aInput: null,
    bInput: null,
    cInput: null,
    answerTextarea: null,
    iframe: null,
    helpLink: null,
    aboutLink: null,

    setup: function () {
        // Get all of the elements
        aInput = document.getElementById('a');
        bInput = document.getElementById('b');
        cInput = document.getElementById('c');
        answerTextarea = document.getElementById('answer');
        iframe = document.getElementById('frame').contentWindow.document;
        helpLink = document.getElementById('help');
        aboutLink = document.getElementById('about');

        // Load the data from local storage
        if (localStorage.savedAInput) {
            aInput.value = localStorage.savedAInput;
            bInput.value = localStorage.savedBInput;
            cInput.value = localStorage.savedCInput;
            QS.solveEquation();
        }

        // Add event listeners
        aInput.addEventListener('keyup', QS.solveEquation, false);
        bInput.addEventListener('keyup', QS.solveEquation, false);
        cInput.addEventListener('keyup', QS.solveEquation, false);
        helpLink.addEventListener('click', QS.printHelp, false);
        aboutLink.addEventListener('click', QS.printAbout, false);
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
    },

    printHelp: function () {
        iframe.body.innerHTML = '<h1>Help</h1><p>This program solves quadratic equations of the format: ax^2 + bx + c. Where "^" means to the power of.<br>Then it solves it using the formula:<br> <span style="text-decoration: underline;">x = -b ± √<span style="text-decoration: overline;">b^2 - 4ac</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2a<br>To get to this format use normal algebraic techniqes. If you do not know how to do this, please consult a book on the subject<br>';
    },

    printAbout: function () {
        iframe.body.innerHTML = '<h1>About</h1><p style="font-family: monospace;">Quadratic Equation Solver<br>     v. 1.3.5.13<br>By Summation Tech<br>   Copyright &copy; 2013 Summation Tech. All Rights Reserved';
    }
}
