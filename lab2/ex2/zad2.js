function sum(x,y) {
    return x+y;
}

function sum_strings(arr){
    let res = 0
    for (const el of arr){
        const parsed = parseInt(el)
        if (!isNaN(parsed)){
            res += parsed
        }
    }
    console.log(res)
    return res
}

function digits(str){
    let odd = 0
    let even = 0
    for (let char of str){
        const parsed = parseInt(char)
        if (!isNaN(parsed)){
            if (parsed % 2 === 0){
                even += parsed
            } else {
                odd += parsed
            }
        }
    }
    return [odd, even]
}

function letters(str){
    let small = 0
    let big = 0
    for (let char of str){
        if (char >= 'a' && char <= 'z') small += 1
        else if (char >= 'A' && char <= 'Z') big += 1
    }
    return [small, big]
}