/* Author: Jeannette Mukamana
Date; 30th, April 2018

Brief Description *****************
This is the program which print either bing , bang or bingBang based on wether the number
is multiple of 3, 5 or both 3 and 5

*/



class numbersWithinArange {

    //constructor
    constructor(lowerBound, upperBound) {
        this.lowerBound = lowerBound
        this.upperBound = upperBound
    }


    //getting the lower bound
    getLowerBound() {
        return this.lowerBound;
    }

    //getting the upper bound
    getUpperBound() {
        return this.upperBound;
    }


    //printing words based on condition
    printNumbersWithinArange() {
        for (var number = this.getLowerBound(); number <= this.getUpperBound(); number++) {

          
             //getting numbers which are multiple of both 3 and 5
            if ((number % 3 == 0) && (number % 5 == 0))
                console.log("BingBang")

            //getting numbers which are multiple of 3
            else if (number % 3 == 0)
                console.log("Bing");

            //getting numbers which are multiple of 5
            else if (number % 5 == 0)
                console.log("Bang");

            //others
            else {
                console.log(number)
            }
        }


    }

}

//testing 
//this can be called from a different class 
//and to use it, you should import it using require key word
var numbers = new numbersWithinArange(-50, 50);
numbers.printNumbersWithinArange();