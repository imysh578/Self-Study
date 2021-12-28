#include <iostream>
#include <stdio.h>

using namespace std;

int main() {
  cout << "gugudan" << endl;
  for (int i = 1; i < 10; i++)
  {
    cout << i << "dan" << endl;
    for (int j = 1; j < 10; j++)
    {
      cout << i*j << endl;
    }
  }
  
}