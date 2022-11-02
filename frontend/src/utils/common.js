export const reduceAddress = (addr = '0x0000000000000000000000000000000000000000', startLength = 8, endLength = 4)=>{
    if(addr && addr.length>10)
        return `${addr.substring(0, startLength)} ... ${addr.substring(addr.length - endLength)}`
    return addr
}