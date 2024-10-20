

// Takes 8 digit long int(YYYYMMDD) and formats to string 'YYYY-MM-DD'
export function releasedToString(released){
    let str = released.toString()
    let ret = str[0] + str[1] + str[2] +str[3] + "-"
    ret += str[4] + str[5] + "-"
    ret += str[6] + str[7]
    
    return ret
}

// Takes 10 character long string 'YYYY-MM-DD' and formats to 8 digit long int
export function stringToReleased(string){
    let temp = string[0] + string[1] + string[2] + string[3]
    let year = parseInt(temp)
    
    temp = string[5] + string[6]
    let month = parseInt(temp)
    
    temp = string[8] + string[9]
    let date = parseInt(temp)
    let ret = (year*10000) + (month*10) + date
    return ret
}