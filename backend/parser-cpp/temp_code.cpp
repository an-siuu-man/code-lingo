#include <iostream>
int main() {
    for (int i = 0; i < 5; i++) {
        std::cout << "Iteration: " << i << std::endl;
        if (i == 2){
            break;
        }
    }
    return 0;
}