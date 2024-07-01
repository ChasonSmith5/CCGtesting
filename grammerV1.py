# Define global variables
data = []
check = ''
wbp = False
winCon = False
wbs = False
shuff = False
abil = False
scoring = False
pwr = False
tbv = False
ebv = False
st = False
nst = False
te = False

def start():
    global check, wbp, winCon, wbs, shuff, abil, scoring, pwr
    
    if not data:
        return "DNE"

    check = data.pop(0)

    if check == 'a':
        return tb()
    elif check == 'b' or check == 'c' or check == 'j':
        return "DNE"
    elif check == 'd':
        wbp = True
        winCon = True
        return start()
    elif check == 'e':
        wbs = True
        winCon = True
        return start()
    elif check == 'f':
        shuff = True
        return start()
    elif check == 'g':
        abil = True
        scoring = True
        return start()
    elif check == 'h':
        pwr = True
        scoring = True
        return start()
    elif check == 'i' and scoring:
        return eb()
    elif check == 'y' and winCon == True:
        return "Done"
    elif check == 'z':
        return start()
    else:
        return "DNE"

def tb():
    global tbv, st, nst
    tbv = True
    ran = 1  # only first call
    check = data.pop(0)

    if check == 'b':
        check = data.pop(0)
        if check == 'z':
            st = True
            return start()
        else:
            return "DNE"
    elif check == 'c':
        nst = True
        return start()
    elif check == 'z':
        if ran == 1:
            return tb()
        else:
            return "DNE"
    else:
        return "DNE"

def eb():
    global ebv, te
    ebv = True
    check = data.pop(0)
    if check == 'j':
        te = True
    return start()

# Example usage:
data = ['a','z','c','z','e','z','g','h','i','z','y']
print(start())

# S -> 'a' TB | 'b' DNE | 'c' DNE | 'd' S | 'e' S | 'f' S | 'g' S | 'h' S | 'i' EB | 'j' DNE | 'y' DONE | 'z' S | DNE
# TB -> 'b' 'z' S | 'b' x DNE | 'c' S | 'z' TB | x DNE
# EB -> 'j' S | x S
