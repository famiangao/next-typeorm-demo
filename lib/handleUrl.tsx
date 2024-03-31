
const appendUrlSearch=(searchKey:string,searchValue:string)=>{
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
  
    // 添加查询参数
    params.set(searchKey,searchValue);
  
    // 更新 URL
    url.search = params.toString();
  
    // 重定向到带有新查询参数的 URL
    window.location.href = url.toString();
  
}

const setUrlSearch=(searchKey:string,searchValue:string)=>{
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
  
    // 添加查询参数
    params.set(searchKey,searchValue);
  
    // 更新 URL
    url.search = params.toString();
  
    // 重定向到带有新查询参数的 URL
    window.location.href = url.toString();
}

const getUrlSearch=()=>{
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.entries();
}
export {
    appendUrlSearch,
    setUrlSearch,
    getUrlSearch
}