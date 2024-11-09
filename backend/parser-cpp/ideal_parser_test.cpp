#include <iostream>
#include <string>

void new_funct(int, float);

int randomVar = 1633;

void displayMessage(std::string name, int age= 0)


{
    std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;
}

int main() {
    // Variables with different data types
    std::string name = "Alice";
    int age = 25;
    double height = 5.8;  // height in feet
    bool isStudent = true;

    // Call the function
    displayMessage(name, age);

    new_funct(1, 2);

    // For loop to count up to 5
    for (int i = 1; i <= 5; ++i) {
        std::cout << "Counting up: " << i << std::endl;
    }


    // While loop to countdown from 3
    int countdown = 3;
    while (countdown > 0) {
        std::cout << "Countdown: " << countdown << std::endl;
        --countdown;
        isStudent=  false;
    }
    
    // If-else condition based on age
    if  (age < 18) 
    
    {
        std::cout << "You are a minor." << std::endl;
    } else {
        std::cout << "You are an adult." << std::endl;
        randomVar += 12;
    }
    
    randomVar -= 6;

    // Return statement in main
    return 0;
}

void new_funct( int            arg1    , float         arg2             ){
    int test_var=0;
    test_var = 1;
    return;
}
