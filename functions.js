function stringify(s){
    let ans="";
    for(let i=0;i<s.length;i++){
        if((s[i]>='a' && s[i]<='z')||(s[i]>='0' && s[i]<='9')){
            ans+=s[i];
        }
        else if(s[i]>='A' && s[i]<='Z'){
            ans+=s[i].toLowerCase();
        }
    }
    return ans;
}

module.exports={stringify}