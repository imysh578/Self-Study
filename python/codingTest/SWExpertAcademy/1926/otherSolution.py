test = int(input())

for t in range(1,test+1):
    x = str(t).count("3") + str(t).count("6") + str(t).count("9")
    if x == 0:
        print(t, end=" ")
    else:
        print("-"*x, end=" ")