export const reduceAddress = (addr, startLength = 8, endLength = 4)=>{
    if(addr && addr.length>10)
        return `${addr.substring(0, startLength)} ... ${addr.substring(addr.length - endLength)}`
    return addr
}