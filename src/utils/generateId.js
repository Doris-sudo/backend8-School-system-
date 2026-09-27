export const generateId = (arr)=> {
    if(arr.length === 0){
        return 1;
    }

    return Math.max(...arr.map(item => item.id)) +1;
};