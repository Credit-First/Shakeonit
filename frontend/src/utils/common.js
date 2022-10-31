export const reduceAddress = (addr)=>{
    if(addr.length>10)
        return `${addr.substring(0, 8)} ... ${addr.substring(addr.length-4)}`
    return addr
}