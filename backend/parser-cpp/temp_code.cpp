#include <iostream>
int fetch() {

    int f = 15; 

    while (f > 10) {
        f -= 2;

        if (f == 13) {
            int h = 10;

            h = h - f;
        }
    }


    for (int i = 0; i < 5; i++) {
        std::cout << "Iteration: " << i << std::endl;
        f = f + i;

        if (f > 19) {
            f = 10;
            break;
        }
    } 
    return 0;
}